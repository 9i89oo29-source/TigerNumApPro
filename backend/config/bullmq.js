const { Queue, Worker } = require('bullmq');
const redisClient = require('./redis');
const logger = require('./logger');

const smsQueue = new Queue('sms-polling', { connection: redisClient });

function setupBullMQ() {
  const worker = new Worker(
    'sms-polling',
    async (job) => {
      logger.info(`Processing SMS job ${job.id}`);
      // الوظيفة الفعلية موجودة في queues/smsQueue.js
    },
    { connection: redisClient, concurrency: 5 }
  );

  worker.on('completed', (job) => {
    logger.info(`Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed: ${err.message}`);
  });
}

module.exports = { smsQueue, setupBullMQ };
