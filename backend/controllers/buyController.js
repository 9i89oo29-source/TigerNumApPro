const orderService = require('../services/orderService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.buyNumber = async (req, res, next) => {
  try {
    const order = await orderService.buyNumber(req.user.uuid, req.body);
    successResponse(res, {
      orderId: order.orderId,
      number: order.number,
      price: order.finalPrice,
      currency: order.currency,
    }, 'Number purchased');
  } catch (err) {
    if (err.message === 'INSUFFICIENT_BALANCE') {
      return errorResponse(res, 'Insufficient balance', 402);
    } else if (err.message === 'PRICING_NOT_FOUND') {
      return errorResponse(res, 'Pricing not found', 404);
    } else if (err.message === 'USER_NOT_FOUND') {
      return errorResponse(res, 'User not found', 404);
    } else if (err.message === 'ACCOUNT_SUSPENDED') {
      return errorResponse(res, 'Account suspended', 403);
    } else if (err.message.startsWith('PROVIDER_')) {
      return errorResponse(res, 'Provider unavailable', 503);
    }
    next(err);
  }
};

exports.getSmsCode = async (req, res, next) => {
  try {
    const order = await orderService.getSmsCodeStatus(req.user.uuid, req.params.orderId);
    successResponse(res, {
      code: order.smsCode,
      status: order.smsCode ? 'ok' : 'waiting',
    });
  } catch (err) {
    if (err.message === 'ORDER_NOT_FOUND') {
      return errorResponse(res, 'Order not found', 404);
    }
    next(err);
  }
};
