// لتوليد هاش لكلمة مرور المشرف وتخزينه في قاعدة البيانات
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config({ path: '../backend/.env' });

const Admin = require('../backend/models/Admin');

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD || 'admin123';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const hash = await bcrypt.hash(password, 12);
    await Admin.findOneAndUpdate(
      { username },
      { passwordHash: hash },
      { upsert: true }
    );
    console.log('Admin seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
