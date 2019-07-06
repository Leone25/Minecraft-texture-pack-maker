const express = require('express');
const app = express();
const fs = require('fs');

// Text to insert into template
const sampleText = 'hello world!!!';
const navbar = ` `;

// Template to accept sampleText
const filepath = 'index.html';
var result = `${fs.readFileSync(filepath).toString()}`;
var result = result;

app.get('/', function (req, res) {
  res.send(result);
})

app.listen(8080);