const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./AnimalRoutes/AnimalRoutes');
const cors = require('cors');
require('dotenv').config(); // load env vars if running locally

// Middleware
app.use(express.json());
app.use(cors());
app.use('/animal', router);

// Connect to DB and start server
const PORT = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  }
};

startServer();
