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
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://cs_db_user_astroone:UYHduAyI8gmbnlsr@cluster0.5udxir4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✓ MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });

// ==================== API ROUTES ====================
app.use('/api/auth', require('./backend/src/routes/authRoutes'));
app.use('/api/user', require('./backend/src/routes/userRoutes'));
app.use('/api/social', require('./backend/src/routes/socialRoutes'));
app.use('/api/payment', require('./backend/src/routes/paymentRoutes'));
app.use('/api/plans', require('./backend/src/routes/planRoutes'));
app.use('/api/admin', require('./backend/src/routes/adminRoutes'));

// ==================== STATIC FILES ====================
// Serve public folder (static HTML/React)
app.use(express.static(path.join(__dirname, 'public')));

// ==================== CATCH-ALL ROUTE ====================
// For React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // If not an API route, serve the React app
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: https://ksbm.onrender.com/:${PORT}`);
  console.log(`🔌 API: https://ksbm.onrender.com/:${PORT}/api`);
});

module.exports = app;
