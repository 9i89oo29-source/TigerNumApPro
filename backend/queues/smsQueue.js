const { Queue, Worker } = require('bullmq');
const redisClient = require('../config/redis');
const smsProviderService = require('../services/smsProviderService');
const orderRepository = require('../repositories/orderRepository');
const logger = require('../config/logger');
const { io } = require('../sockets/smsSocket'); // نحتاج إلى io، لذا نستخدم نمطاً آخر

const smsQueue = new Queue('sms-polling', { connection: redisClient });

// سيتم تعريف العامل في config/bullmq.js لكن نضيف هنا المنطق الفعلي
const processSmsJob = async (job) => {
  const { orderId, factory, activationId } = job.data;
  let attempts = 0;
  const maxAttempts = 24; // دقيقتان

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
      const result = await smsProviderService.getSmsCode(factory, activationId);
      if (result.status === 'ok') {
        await orderRepository.updateSmsCode(orderId, result.code, 'completed');
        // إرسال الكود عبر Socket.IO
        const io = require('../sockets/smsSocket').getIO();
        if (io) {
          io.to(orderId).emit('smsCode', { code: result.code, orderId });
        }
        return;
      } else if (result.status === 'error') {
        await orderRepository.updateSmsCode(orderId, null, 'cancelled');
        return;
      }
    } catch (err) {
      logger.error(`SMS polling error for ${orderId}: ${err.message}`);
      await smsProviderService.cancelNumber(factory, activationId);
      await orderRepository.updateSmsCode(orderId, null, 'expired');
      return;
    }
    attempts++;
  }
  await orderRepository.updateSmsCode(orderId, null, 'expired');
};

// يجب إضافة worker في bullmq setup أو هنا؛ سنقوم بتعديل بسيط: نصنع worker هنا لكن نستدعيه من config/bullmq
// نستخدم نمط التصدير لتهيئة worker
const worker = new Worker('sms-polling', processSmsJob, { connection: redisClient, concurrency: 5 });

worker.on('completed', job => logger.info(`SMS job ${job.id} completed`));
worker.on('failed', (job, err) => logger.error(`SMS job ${job.id} failed: ${err.message}`));

exports.addSmsPollingJob = async (orderId, factory, activationId) => {
  await smsQueue.add('poll-sms', { orderId, factory, activationId }, {
    attempts: 1,
    removeOnComplete: true,
    removeOnFail: true,
  });
};
