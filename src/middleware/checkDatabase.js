const mongoose = require('mongoose');

async function checkDatabase(req, res, next) {
  if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
    return res.status(503).json({
      status: 'error',
      server: 'ok',
      database: 'disconnected',
    });
  }

  try {
    await mongoose.connection.db.admin().ping();
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkDatabase;
