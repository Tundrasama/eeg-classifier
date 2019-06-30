const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const classification = require('./models/Classification');
const path = require('path');
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
const imgDirFiles = require('./functions.js');
const Classification = require('./models/Classification.js');

images = [];
images = imgDirFiles.fetchImages();

// connect to database
connectDB();

Classification.find(
  {
    // need to replace with actual user here...
    user: 'mwestover@mgh.harvard.edu'
  },
  'picture_path',
  function(err, classifications) {
    if (err) return err.message;

    userImages = classifications.map(class_ => ({
      filePath: class_.picture_path
    }));

    userClassifications = userImages.length;

    console.log(
      'User has: ' + userClassifications + ' classifications completed.'
    );

    userImages.forEach(item => {
      var index = images.indexOf(item.filePath);
      if (index > -1) {
        images.splice(index, 1);
      }
    });
    if (images[0]) {
      console.log('Next image to serve: ' + images[0]);
    } else {
      console.log('User has reviewed all classification images');
    }
  }
);

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
