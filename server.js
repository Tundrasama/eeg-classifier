const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const classification = require('./models/Classification');
const path = require('path');

const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

// var db;

// connect to database
connectDB();

//don't believe body parser is the most recent way of handling...
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.json({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
// // console.log(process.env);
// const config = require('config');
// process.env['NODE_ENV'] = 'development';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});

// route = '/test.html';
// route = '/public/eeg-classification.html';
// route = '/jsontest.html';

// app.use('/api/channel/', require('./routes/classification'));

route = '/public/eeg-classification.html';
app.get('/', (req, res) => {
  res.sendFile(__dirname + route);
});

app.post('/eeg-classification', (req, res) => {
  console.log('Helloooooooooo!');
  console.log();
});
