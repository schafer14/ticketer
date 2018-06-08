const express = require('express');

const app = express();


app.use((req, res, next) => {
  console.log('RECIEVING REQUEST');
  next();
})

module.exports = app;
