const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use((req, res, next) => { // DEBUG-TEMP
  console.log('REQ', req.method, req.originalUrl); // DEBUG-TEMP
  next(); // DEBUG-TEMP
}); // DEBUG-TEMP

app.use(cors(process.env.CLIENT_URL ? { origin: [ 
  "http://localhost:5173/",
  "https://house-hunting-web.onrender.com",
] } : {}));
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/v1/listings', require('./routes/listings'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/signup', require('./routes/signuproute'));
app.use('/api/v1/payments', require('./routes/payments'));
app.use('/api/v1/tenant-searches', require('./routes/tenantSearch'));
app.use('/api/v1/virtual-tour-requests', require('./routes/virtualTourRequests'));
app.use('/api/v1/test', require('./routes/setupTest'));

app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must contain valid JSON' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'A record with that value already exists' });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
