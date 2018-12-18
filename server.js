'use strict';

const {PORT} = require('./config');
const data = require('./db/notes');
const {requestLogger} = require('./middleware/logger');


console.log('Hello Noteful!');

const express = require('express');

const app = express();
// Static server VVV
app.use(express.static('public'));
app.use(requestLogger);

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if(searchTerm){
    let filteredNotes = data.filter(item =>
    {return item.title.includes(searchTerm);});
    res.json(filteredNotes); 
  }
  else {res.json(data);}
});
    

app.get('/api/notes/:id', (req, res)=> {
  const { id } = req.params;
  let requestedNote = data.find(item => item.id === Number(id));
  res.json(requestedNote);
});
app.get('/boom' , (req, res, next) => {
  throw new Error('Boom !!');
});

app.use(function(req, res , next) {
  let err = new Error('not Found');
  err.status = 404;
  res.status(404).json({ message: 'not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message : err.message,
    error : err
  });
});



app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

