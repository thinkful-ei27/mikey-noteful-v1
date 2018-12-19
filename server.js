'use strict';

const { PORT } = require('./config');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { requestLogger } = require('./middleware/logger');


console.log('Hello Noteful!');

const express = require('express');

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

// Static server VVV, below logger to log .static get request
app.use(express.static('public'));
app.use(express.json());


app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id,(err, list) => {
    if (err) {
      return next(err); 
    }
    res.json(list); 
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


// app.get('/boom' , (req, res, next) => {
//   throw new Error('Boom !!');
// });

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



app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

