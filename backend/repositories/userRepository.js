const User = require('../models/User');

exports.findByUuid = (uuid) => User.findOne({ uuid });
exports.findByEmail = (email) => User.findOne({ email });
exports.createUser = (userData) => User.create(userData);
exports.updateBalance = (uuid, amount) =>
  User.findOneAndUpdate({ uuid }, { $inc: { balance: amount } }, { new: true });
exports.updateRefreshToken = (uuid, token) =>
  User.findOneAndUpdate({ uuid }, { refreshToken: token });
exports.findAll = () => User.find({}, { passwordHash: 0, refreshToken: 0 });
