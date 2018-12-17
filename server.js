'use strict';

console.log('Hello Noteful!');

const express = require('express');
const data = require('./db/notes');
const app = express();
// ADD STATIC server here

app.listen(8080, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});