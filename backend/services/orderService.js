const orderRepository = require('../repositories/orderRepository');
const userRepository = require('../repositories/userRepository');
const pricingService = require('./pricingService');
const smsProviderService = require('./smsProviderService');
const auditLogRepository = require('../repositories/auditLogRepository');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const logger = require('../config/logger');

exports.buyNumber = async (userUuid, { factory, country, service }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await userRepository.findByUuid(userUuid);
    if (!user) throw new Error('USER_NOT_FOUND');
    if (user.accountStatus !== 'active') throw new Error('ACCOUNT_SUSPENDED');

    const pricing = await pricingService.getPrice(factory, country, service);
    if (!pricing) throw new Error('PRICING_NOT_FOUND');

    const price = pricing.retailPrice;
    if (user.balance < price) throw new Error('INSUFFICIENT_BALANCE');

    // شراء الرقم من المزوّد
    const { activationId, number } = await smsProviderService.getNumber(factory, country, service);

    // خصم الرصيد
    await userRepository.updateBalance(userUuid, -price);

    // إنشاء الطلب
    const orderId = uuidv4();
    const order = await orderRepository.createOrder({
      orderId,
      userUuid,
      factory,
      country,
      service,
      finalPrice: price,
      currency: user.localCurrency,
      number,
      activationId,
      status: 'pending',
    });

    await auditLogRepository.logAction('NUMBER_PURCHASED', userUuid, orderId, { factory, country, service });

    await session.commitTransaction();

    // إضافة مهمة مراقبة SMS إلى الـ Queue
    require('../queues/smsQueue').addSmsPollingJob(orderId, factory, activationId);

    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.getSmsCodeStatus = async (userUuid, orderId) => {
  const order = await orderRepository.findByOrderId(orderId);
  if (!order || order.userUuid !== userUuid) throw new Error('ORDER_NOT_FOUND');
  return order;
};
