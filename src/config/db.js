const mongoose = require('mongoose');

async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error('MONGO_URI is not set. Add it to src/.env before starting the server.');
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}

module.exports = connectDB;
