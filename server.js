const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const classification = require('./models/Classification');
const path = require('path');

var db;

// connect to database
connectDB();

//don't believe body parser is the most recent way of handling...
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('listening on 3000');
});

// route = '/test.html';
route = '/public/eeg-classification.html';
// route = '/jsontest.html';

// app.use('/api/channel/', require('./routes/classification'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + route);
});

app.post('/eeg-classification', (req, res) => {
  console.log('Helloooooooooo!');
  console.log();
});
