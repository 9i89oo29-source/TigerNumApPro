const axios = require('axios');
const logger = require('../config/logger');

const HERO_API_KEY = process.env.HERO_API_KEY;
const TIGER_API_KEY = process.env.TIGER_API_KEY;
const HERO_BASE = 'https://api.hero-sms.com/stubs/handler_api.php';
const TIGER_BASE = 'https://api.tiger-sms.com/stubs/handler_api.php';

async function callProviderApi(base, apiKey, params) {
  const response = await axios.get(base, { params: { api_key: apiKey, ...params }, timeout: 15000 });
  return response.data;
}

exports.getNumber = async (factory, country, service) => {
  const apiKey = factory === 'main' ? HERO_API_KEY : TIGER_API_KEY;
  const base = factory === 'main' ? HERO_BASE : TIGER_BASE;

  const result = await callProviderApi(base, apiKey, {
    action: 'getNumber',
    service,
    country,
  });

  if (result.startsWith('ACCESS_NUMBER:')) {
    const [, activationId, number] = result.split(':');
    return { activationId, number };
  } else if (result === 'NO_NUMBERS') {
    throw new Error('PROVIDER_NO_NUMBERS');
  } else {
    logger.error(`Provider error: ${result}`);
    throw new Error('PROVIDER_ERROR');
  }
};

exports.getSmsCode = async (factory, activationId) => {
  const apiKey = factory === 'main' ? HERO_API_KEY : TIGER_API_KEY;
  const base = factory === 'main' ? HERO_BASE : TIGER_BASE;

  const result = await callProviderApi(base, apiKey, {
    action: 'getStatus',
    id: activationId,
  });

  if (result.startsWith('STATUS_OK:')) {
    const code = result.split(':')[1];
    return { status: 'ok', code };
  } else if (result === 'STATUS_WAIT_CODE') {
    return { status: 'waiting' };
  } else {
    // STATUS_CANCEL or error
    return { status: 'error' };
  }
};

exports.cancelNumber = async (factory, activationId) => {
  const apiKey = factory === 'main' ? HERO_API_KEY : TIGER_API_KEY;
  const base = factory === 'main' ? HERO_BASE : TIGER_BASE;

  try {
    await callProviderApi(base, apiKey, {
      action: 'setStatus',
      id: activationId,
      status: 8,
    });
  } catch (err) {
    logger.error(`Cancel number failed: ${err.message}`);
  }
};

exports.fallbackGetNumber = async (country, service) => {
  // تجربة المصنع الاحتياطي عند فشل الرئيسي
  try {
    return await exports.getNumber('backup', country, service);
  } catch (err) {
    throw new Error('PROVIDER_UNAVAILABLE');
  }
};
