const pricingRepository = require('../repositories/pricingRepository');

exports.getPrice = (factory, country, service) =>
  pricingRepository.findByCriteria(factory, country, service);

exports.getAllRules = () => pricingRepository.findAll();

exports.createRule = (data) => pricingRepository.createRule(data);

exports.updateRule = (id, updates) => pricingRepository.updateRule(id, updates);

exports.deleteRule = (id) => pricingRepository.deleteRule(id);
