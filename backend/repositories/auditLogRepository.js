const AuditLog = require('../models/AuditLog');

exports.logAction = (action, performedBy, target, details) =>
  AuditLog.create({ action, performedBy, target, details });
