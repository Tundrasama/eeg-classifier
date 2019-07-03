const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
const images = require('./nextImage.js');
const jwt = require('jsonwebtoken');

// when app loads, generate a list of images from
// a directory -- will need to be updated to the CDN
// if packaging the images with the application does
// not work effectively
var imageList_push = [];
imageList_push = images.fetchImages();

// imageItems = images.testImages('cmmcgraw@mgh.harvard.edu');
// imageItems.then(function(result) {
//   console.log(result);
// });

// connect to database
connectDB();

// use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/eeg-classification', function(req, res) {
  // console.log('pug version');
  res.render('eeg-classification', {
    imgSource: 'media/images/' + process.env.NEXT_IMAGE.replace(/[']/g, ''),
    userImageCount: process.env.USER_CLASSIFICATIONS,
    totalImageCount: imageList_push.length,
    user: process.env.USER
  });
});

app.post('/', (req, res) => {
  //console.log('Login Post');
  const { user } = req.body;
  process.env.USER = user;
  switch (process.env.USER) {
    case 'Chris':
      userEmail = 'cmmcgraw@mgh.harvard.edu';
      break;
    case 'Brandon':
      userEmail = 'mwestover@mgh.harvard.edu';
      break;
    case 'Guest':
      userEmail = 'guest@mgh.harvard.edu';
  }
  if (user !== 'Chris' && user !== 'Brandon' && user !== 'Guest') {
    res.sendStatus(403);
  } else {
    // jwt.sign({ user: user }, 'secretkey', (err, token) => {
    //   userToken = token;
    //   console.log(userToken);
    //   res.json({
    //     token: token
    //   });
    // });

    try {
      imageList = [];
      imageItems = images.userImages(userEmail);
      imageItems.then(function(result) {
        imageList = result.map(function(image) {
          return image.picture_path;
        });
        process.env.USER_CLASSIFICATIONS = imageList.length;
        console.log('Image List: ' + imageList);
        nextIMG = images.nextImage(imageList);
        nextIMG.then(function(result) {
          if (result !== null) {
            nextImage = result.picture_path;
            console.log('Next image: ' + nextImage);
            process.env.NEXT_IMAGE = nextImage;
            process.env.NEXT_IMAGE = process.env.NEXT_IMAGE.replace(/[']/g, '');
            console.log(
              user +
                ' has logged in... First image to serve: /media/images/' +
                process.env.NEXT_IMAGE.replace(/[']/g, '')
            );
            res.redirect('eeg-classification');
          } else {
            res.json({ message: 'All available images have been classified.' });
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  }
});

route = '/public/eeg-classification.html';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// API Routes
app.use('/eeg-classification', require('./routes/classification'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on ' + port);
});
