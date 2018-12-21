'use strict';

const { PORT } = require('./config');



console.log('Hello Noteful!');

const express = require('express');
const app = express();

const notesRouter = require('./router/notes.router');

const morgan = require('morgan');
app.use(morgan('dev'));




app.use(express.static('public'));
app.use(express.json());
app.use('/api', notesRouter);


app.use(function (req, res, next) {
  let err = new Error('not Found');
  err.status = 404;
  res.status(404).json({ message: 'not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


if(require.main === module){
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app;