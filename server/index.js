// @server 服务器入口
/* eslint-disable */
'use strict';

const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const config = require('config');

const app = express();
app.use(express.static(path.join(__dirname, '../dist')));

// 反向代理 dbdoc 接口服务
app.use(`/dbdoc`, proxy({
  target: config.get('api'),
  pathRewrite: {'^/dbdoc': ''},
  changeOrigin: true,
}));

app.get('/*', function (req, res) {
  console.log(req.ip, ' => ', req.url);
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(config.get('port'), (err) => {
  if (err) {
    console.error(err.stack || err);
    return;
  }
  process.send && process.send('ready');
  console.info(`Server is up in ${process.uptime()}s at port ${config.get('port')}.`);
});
