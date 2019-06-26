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
  //console.log(__dirname + route);
  res.sendFile(__dirname + route);
});

// use static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/eeg-classification', require('./routes/classification'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});

//app.get('/', (req, res) => res.send('API Running'));

// app.post('/eeg-classification', (req, res) => {
//   console.log('Helloooooooooo!');
//   console.log();
// });
