const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/saas_app')
  .then(() => console.log('✓ MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', require('./backend/src/routes/authRoutes'));
app.use('/api/user', require('./backend/src/routes/userRoutes'));
app.use('/api/social', require('./backend/src/routes/socialRoutes'));
app.use('/api/payment', require('./backend/src/routes/paymentRoutes'));
app.use('/api/plans', require('./backend/src/routes/planRoutes'));
app.use('/api/admin', require('./backend/src/routes/adminRoutes'));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Catch all - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
