const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

// Configuration for the proxy middleware
const options = {
  target: 'http://toptier.ventures.s3-website-us-east-1.amazonaws.com', // Target host
  changeOrigin: true, // Needed for virtual hosted sites
  pathRewrite: {
    '^/': '/', // Rewrite path: remove base path
  },
};

// Apply the proxy middleware for root path
app.use('/', createProxyMiddleware(options));

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
