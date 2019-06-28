const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const classifications = require('../models/Classification');

//app.get('/', (req, res) => res.send('API Running'));
router.get('/', async (req, res) => {
  console.log('GET');

  try {
    const Classification = await classifications.find().populate();

    res.json(Classification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',

  async (req, res) => {
    try {
      // as long as these values = the same name as the model, should be able to pass into
      // model -- just unsure about

      const classificationFields = req.body;
      console.log(classificationFields);
      classification = new classifications({});
      classification.user = 'chris.mcgraw@harvard.edu';
      classification.picture_path = 'test_id';

      if (req.body.not_lpd_gpd) {
        console.log('Not LPD/GPD: ' + req.body.not_lpd_gpd);
        classification.submitFlag = 0;
      } else if (req.body.pass) {
        console.log('Pass: ' + req.body.pass);
        classification.submitFlag = null;
      } else if (req.body.submit) {
        classification.submitFlag = 1; // need to be able to tell if submit, not lpd/gpd, or pass was pressed

        const choiceFields = {};
        choiceFields.classifier = classificationFields.classChoice;
        choiceFields.classType = classificationFields.class_type;
        choiceFields.predominance = classificationFields.predom;
        classification.classificationChoice = choiceFields;

        const optChoiceFields = {};
        optChoiceFields.classifier = classificationFields.opt_classChoice;
        optChoiceFields.classType = classificationFields.opt_class_type;
        optChoiceFields.predominance = classificationFields.opt_predom;
        classification.opt_classificationChoice = optChoiceFields;

        classification.montage = classificationFields.montage || 'bipolar';
        classification.frequency = classificationFields.frequency;

        classification.channel_1 = {
          selected: classificationFields.channel_1 || false
        };
        classification.channel_2 = {
          selected: classificationFields.channel_2 || false
        };
        classification.channel_3 = {
          selected: classificationFields.channel_3 || false
        };
        classification.channel_4 = {
          selected: classificationFields.channel_4 || false
        };
        classification.channel_5 = {
          selected: classificationFields.channel_5 || false
        };
        classification.channel_6 = {
          selected: classificationFields.channel_6 || false
        };
        classification.channel_7 = {
          selected: classificationFields.channel_7 || false
        };
        classification.channel_8 = {
          selected: classificationFields.channel_8 || false
        };
        classification.channel_9 = {
          selected: classificationFields.channel_9 || false
        };
        classification.channel_10 = {
          selected: classificationFields.channel_10 || false
        };
        classification.channel_11 = {
          selected: classificationFields.channel_11 || false
        };
        classification.channel_12 = {
          selected: classificationFields.channel_12 || false
        };
        classification.channel_13 = {
          selected: classificationFields.channel_13 || false
        };
        classification.channel_14 = {
          selected: classificationFields.channel_14 || false
        };
        classification.channel_15 = {
          selected: classificationFields.channel_15 || false
        };
        classification.channel_16 = {
          selected: classificationFields.channel_16 || false
        };
        classification.channel_17 = {
          selected: classificationFields.channel_17 || false
        };
        classification.channel_18 = {
          selected: classificationFields.channel_18 || false
        };
      }
      console.log(classification);
      // commented out below while testing
      await classification.save();
      console.log('Saved...');

      res.redirect('/');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error: ' + err.message);
    }
  }
);

// router.post(
//   '/',
//   [
//     // verify that a classification has been selected
//     // names: LPD-CLASSIFICATION, GPD-CLASSIFICATION, LPD2-CLASSIFICATION
//     //check('LPD-CLASSIFICATION').custom(value => {})
//     //  if LPD,
//     // must have at least U/I or B/I
//     // must have at least 1 predominance
//     //  if GPD,
//     // must have at least 1 predominance
//     //  if LPD-2,
//     // must have at least U/I or B/I
//     // must have at least 1 predominance
//     // Must have at least one Frequency
//     // Must have at least on Channel
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       classification = new Classification({});

//       res.redirect('/');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

module.exports = router;
