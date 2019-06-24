const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const classification = require('./models/Classification');
const path = require('path');
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

route = '/public/eeg-classification.html';
app.get('/', (req, res) => {
  console.log(__dirname + route);
  res.sendFile(__dirname + route);
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});

app.post('/eeg-classification', (req, res) => {
  console.log('Helloooooooooo!');
  console.log();
});
