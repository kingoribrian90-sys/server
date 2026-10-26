const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

process.on('unhandledRejection', (reason) => { // DEBUG-TEMP
  console.error('Unhandled promise rejection:', reason); // DEBUG-TEMP
}); // DEBUG-TEMP

process.on('uncaughtException', (error) => { // DEBUG-TEMP
  console.error('Uncaught exception:', error); // DEBUG-TEMP
}); // DEBUG-TEMP

const app = require('./app');
const connectDB = require('./config/db');

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exitCode = 1;
});