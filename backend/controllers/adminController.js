const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt');
const userService = require('../services/userService');
const userRepository = require('../repositories/userRepository');
const pricingService = require('../services/pricingService');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const Admin = require('../models/Admin');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return errorResponse(res, 'Invalid credentials', 401);
    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return errorResponse(res, 'Invalid credentials', 401);
    const token = jwtUtils.generateAccessToken({ username, role: 'admin' });
    successResponse(res, { token }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    successResponse(res, users);
  } catch (err) {
    next(err);
  }
};

exports.topUp = async (req, res, next) => {
  try {
    const { uuid, amount } = req.body;
    await userService.topUpBalance(uuid, amount);
    successResponse(res, null, 'Balance topped up');
  } catch (err) {
    if (err.message === 'USER_NOT_FOUND') {
      return errorResponse(res, 'User not found', 404);
    }
    next(err);
  }
};

exports.getPricing = async (req, res, next) => {
  try {
    const rules = await pricingService.getAllRules();
    successResponse(res, rules);
  } catch (err) {
    next(err);
  }
};

exports.createPricing = async (req, res, next) => {
  try {
    const rule = await pricingService.createRule(req.body);
    successResponse(res, rule, 'Pricing rule created');
  } catch (err) {
    next(err);
  }
};

exports.updatePricing = async (req, res, next) => {
  try {
    const rule = await pricingService.updateRule(req.params.id, req.body);
    if (!rule) return errorResponse(res, 'Rule not found', 404);
    successResponse(res, rule, 'Pricing rule updated');
  } catch (err) {
    next(err);
  }
};

exports.deletePricing = async (req, res, next) => {
  try {
    await pricingService.deleteRule(req.params.id);
    successResponse(res, null, 'Pricing rule deleted');
  } catch (err) {
    next(err);
  }
};
