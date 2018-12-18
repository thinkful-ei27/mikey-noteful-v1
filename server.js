'use strict';

const {PORT} = require('./config');
const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');

const app = express();
// Static server VV
app.use(express.static('public'));

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

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

