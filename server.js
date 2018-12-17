'use strict';


const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');

const app = express();
// Static server VV
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res)=> {
  const { id } = req.params;
  
  let requestedNote = data.find(item => item.id === Number(id));
  // for (let i = 0; i < data.length; i++){
  //   if(data[i].id === id ){
  //     requestedNote = data[i];
  //   }
  
  res.json(requestedNote);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

