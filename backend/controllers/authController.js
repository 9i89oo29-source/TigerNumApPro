const userService = require('../services/userService');
const jwtUtils = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    const accessToken = jwtUtils.generateAccessToken({ uuid: user.uuid });
    const refreshToken = jwtUtils.generateRefreshToken({ uuid: user.uuid });
    await require('../repositories/userRepository').updateRefreshToken(user.uuid, refreshToken);
    successResponse(res, {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      balance: user.balance,
      currency: user.localCurrency,
      accessToken,
      refreshToken,
    }, 'Registration successful');
  } catch (err) {
    if (err.message === 'EMAIL_EXISTS') {
      return errorResponse(res, 'Email already registered', 409);
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);
    const accessToken = jwtUtils.generateAccessToken({ uuid: user.uuid });
    const refreshToken = jwtUtils.generateRefreshToken({ uuid: user.uuid });
    await require('../repositories/userRepository').updateRefreshToken(user.uuid, refreshToken);
    successResponse(res, {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      balance: user.balance,
      currency: user.localCurrency,
      accessToken,
      refreshToken,
    }, 'Login successful');
  } catch (err) {
    if (err.message === 'USER_NOT_FOUND') {
      return errorResponse(res, 'User not found', 404);
    }
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return errorResponse(res, 'No refresh token provided', 400);
    const result = await userService.refreshAccessToken(refreshToken);
    successResponse(res, result, 'Token refreshed');
  } catch (err) {
    if (err.message === 'INVALID_REFRESH_TOKEN') {
      return errorResponse(res, 'Invalid refresh token', 401);
    }
    next(err);
  }
};
