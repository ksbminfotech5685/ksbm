const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const AdminUser = require('../src/models/AdminUser');

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await AdminUser.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    const admin = new AdminUser({
      name: 'Super Admin',
      email: 'admin@example.com',
      passwordHash: 'admin1234',
      role: 'admin'
    });

    await admin.save();
    console.log('✓ Admin created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin1234');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
