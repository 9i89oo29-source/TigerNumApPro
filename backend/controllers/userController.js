const userService = require('../services/userService');
const orderRepository = require('../repositories/orderRepository');
const userRepository = require('../repositories/userRepository');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userRepository.findByUuid(req.user.uuid);
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      balance: user.balance,
      currency: user.localCurrency,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBalance = async (req, res, next) => {
  try {
    const user = await userRepository.findByUuid(req.user.uuid);
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, { balance: user.balance, currency: user.localCurrency });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderRepository.findByUserUuid(req.user.uuid);
    successResponse(res, orders);
  } catch (err) {
    next(err);
  }
};
