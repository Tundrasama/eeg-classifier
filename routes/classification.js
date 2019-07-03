const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const classifications = require('../models/Classification');
const images = require('../nextImage.js');
const jwt = require('jsonwebtoken');
const server = './server.js';

//app.get('/', (req, res) => res.send('API Running'));
router.get('/API', async (req, res) => {
  console.log('GET');
  try {
    const Classification = await classifications.find().populate();

    res.json(Classification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  // const user = '';
  // jwt.verify(req.token, 'secretkey', (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403);
  //   } else {
  //     // console.log('successful jwt');
  //     // user = authData.user;
  //     res.json({
  //       message: 'success',
  //       authData
  //     });
  //   }
  // });
  try {
    const classificationFields = req.body;
    const channels = [];
    var userEmail;
    console.log(classificationFields);
    classification = new classifications({});
    console.log(process.env.USER);
    switch (process.env.USER) {
      case 'Chris':
        classification.user = 'cmmcgraw@mgh.harvard.edu';
        userEmail = classification.user;
        break;
      case 'Brandon':
        classification.user = 'mwestover@mgh.harvard.edu';
        userEmail = classification.user;
    }

    // const randNum = Math.floor(Math.random() * 5);

    // if (randNum == 1) {
    //   classification.user = 'cmmcgraw@mgh.harvard.edu';
    // } else if (randNum == 4) {
    //   classification.user = 'mwestover@mgh.harvard.edu';
    // } else {
    //   classification.user = 'reviewer3@harvard.edu';
    // }

    console.log(process.env.NEXT_IMAGE);
    classification.picture_path = process.env.NEXT_IMAGE;
    //LPD_Sample271_sid133_20151129_091659_018758.mat_bi.png

    // Determine submission Event --
    // Not LPD/GPD = 0
    // Pass = null
    // Valid Submission = 1
    if (req.body.not_lpd_gpd) {
      console.log('Not LPD/GPD: ' + req.body.not_lpd_gpd);
      classification.submitFlag = 0;
    } else if (req.body.pass) {
      console.log('Pass: ' + req.body.pass);
      classification.submitFlag = null;
    } else if (req.body.submit) {
      classification.submitFlag = 1;

      // const choiceFields = {};
      // choiceFields.classifier = classificationFields.classChoice;
      // choiceFields.classType = classificationFields.class_type;
      // choiceFields.predominance = classificationFields.predom;
      // classification.classificationChoice = choiceFields;

      classification.classification_choice = classificationFields.classChoice;
      classification.classification_type = classificationFields.class_type;
      classification.classification_predom = classificationFields.predom;

      // const optChoiceFields = {};
      // optChoiceFields.classifier = classificationFields.opt_classChoice;
      // optChoiceFields.classType = classificationFields.opt_class_type;
      // optChoiceFields.predominance = classificationFields.opt_predom;
      // classification.opt_classificationChoice = optChoiceFields;

      classification.optional_classification =
        classificationFields.opt_classChoice;
      classification.optional_type = classificationFields.opt_class_type;
      classification.optional_predom = classificationFields.opt_predom;

      classification.montage = classificationFields.montage || 'bipolar';
      classification.frequency = classificationFields.frequency;

      // get channel names present
      //sure there is a better way to do this.
      if (classificationFields.channel_1) {
        channels.push('Fp1-F7');
      }
      if (classificationFields.channel_2) {
        channels.push('F7-T3');
      }
      if (classificationFields.channel_3) {
        channels.push('T3-T5');
      }
      if (classificationFields.channel_4) {
        channels.push('T5-01');
      }
      if (classificationFields.channel_5) {
        channels.push('Fp2-F8');
      }
      if (classificationFields.channel_6) {
        channels.push('F8-T4');
      }
      if (classificationFields.channel_7) {
        channels.push('T4-T6');
      }
      if (classificationFields.channel_8) {
        channels.push('T6-O2');
      }
      if (classificationFields.channel_9) {
        channels.push('Fp1-F3');
      }
      if (classificationFields.channel_10) {
        channels.push('F3-C3');
      }
      if (classificationFields.channel_11) {
        channels.push('C3-P3');
      }
      if (classificationFields.channel_12) {
        channels.push('P3-O1');
      }
      if (classificationFields.channel_13) {
        channels.push('Fp2-F4');
      }
      if (classificationFields.channel_14) {
        channels.push('F4-C4');
      }
      if (classificationFields.channel_15) {
        channels.push('C4-P4');
      }
      if (classificationFields.channel_16) {
        channels.push('P4-O2');
      }
      if (classificationFields.channel_17) {
        channels.push('Fz-Cz');
      }
      if (classificationFields.channel_18) {
        channels.push('Cz-Pz');
      }

      classification.channelsSelected = channels;
    }
    console.log(classification);
    // commented out below while testing
    await classification.save();
    console.log('Saved...');

    console.log('Channels: ' + channels);

    //splice current image from images array
    // is the images array accessible from here?
    console.log(server.imageList);
    //find next image to load
    // update process.env.NEXT_IMAGE

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
              userEmail +
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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    //get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // next middleware
    console.log('VerifyToken: ' + req.token);
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
