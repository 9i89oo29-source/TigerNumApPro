const Order = require('../models/Order');

exports.createOrder = (data) => Order.create(data);
exports.findByOrderId = (orderId) => Order.findOne({ orderId });
exports.updateSmsCode = (orderId, code, status) =>
  Order.findOneAndUpdate({ orderId }, { smsCode: code, status });
exports.findByUserUuid = (userUuid) =>
  Order.find({ userUuid }).sort({ createdAt: -1 });
