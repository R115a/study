const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const PORT = process.env.PORT || 3000;

// 80億分の1の公式URL
const TARGET_URL = 'https://1in8b.life';

// プロキシ（中継）処理
app.use('/', proxy(TARGET_URL, {
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    delete headers['x-frame-options'];
    delete headers['content-security-policy'];
    return headers;
  }
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
