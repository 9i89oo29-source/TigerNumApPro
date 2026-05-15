const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const auditLogRepository = require('../repositories/auditLogRepository');
const jwtUtils = require('../utils/jwt');
const logger = require('../config/logger');

exports.registerUser = async ({ name, email, phone }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error('EMAIL_EXISTS');

  const uuid = uuidv4();
  const user = await userRepository.createUser({ uuid, name, email, phone, balance: 0 });
  await auditLogRepository.logAction('USER_REGISTER', uuid, email, { name });
  return user;
};

exports.loginUser = async ({ email }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('USER_NOT_FOUND');
  // No password, just UUID-based
  return user;
};

exports.refreshAccessToken = async (refreshToken) => {
  const payload = jwtUtils.verifyRefreshToken(refreshToken);
  if (!payload) throw new Error('INVALID_REFRESH_TOKEN');
  const user = await userRepository.findByUuid(payload.uuid);
  if (!user || user.refreshToken !== refreshToken) throw new Error('INVALID_REFRESH_TOKEN');
  const newAccessToken = jwtUtils.generateAccessToken({ uuid: user.uuid });
  return { accessToken: newAccessToken };
};

exports.topUpBalance = async (uuid, amount) => {
  const user = await userRepository.updateBalance(uuid, amount);
  if (!user) throw new Error('USER_NOT_FOUND');
  await auditLogRepository.logAction('BALANCE_TOPUP', 'admin', uuid, { amount });
  return user;
};
