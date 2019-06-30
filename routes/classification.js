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

      const randNum = Math.floor(Math.random() * 5);

      if (randNum == 1) {
        classification.user = 'cmmcgraw@mgh.harvard.edu';
      } else if (randNum == 4) {
        classification.user = 'mwestover@mgh.harvard.edu';
      } else {
        classification.user = 'reviewer3@harvard.edu';
      }

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
          name: 'Fp1-F7',
          group: 'chain-1',
          selected: classificationFields.channel_1 || false
        };
        classification.channel_2 = {
          name: 'F7-T3',
          group: 'chain-1',
          selected: classificationFields.channel_2 || false
        };
        classification.channel_3 = {
          name: 'T3-T5',
          group: 'chain-1',
          selected: classificationFields.channel_3 || false
        };
        classification.channel_4 = {
          name: 'T5-01',
          group: 'chain-1',
          selected: classificationFields.channel_4 || false
        };
        classification.channel_5 = {
          name: 'Fp2-F8',
          group: 'chain-2',
          selected: classificationFields.channel_5 || false
        };
        classification.channel_6 = {
          name: 'F8-T4',
          group: 'chain-2',
          selected: classificationFields.channel_6 || false
        };
        classification.channel_7 = {
          name: 'T4-T6',
          group: 'chain-2',
          selected: classificationFields.channel_7 || false
        };
        classification.channel_8 = {
          name: 'T6-O2',
          group: 'chain-2',
          selected: classificationFields.channel_8 || false
        };
        classification.channel_9 = {
          name: 'Fp1-F3',
          group: 'chain-3',
          selected: classificationFields.channel_9 || false
        };
        classification.channel_10 = {
          name: 'F3-C3',
          group: 'chain-3',
          selected: classificationFields.channel_10 || false
        };
        classification.channel_11 = {
          name: 'C3-P3',
          group: 'chain-3',
          selected: classificationFields.channel_11 || false
        };
        classification.channel_12 = {
          name: 'P3-O1',
          group: 'chain-3',
          selected: classificationFields.channel_12 || false
        };
        classification.channel_13 = {
          name: 'Fp2-F4',
          group: 'chain-4',
          selected: classificationFields.channel_13 || false
        };
        classification.channel_14 = {
          name: 'F4-C4',
          group: 'chain-4',
          selected: classificationFields.channel_14 || false
        };
        classification.channel_15 = {
          name: 'C4-P4',
          group: 'chain-4',
          selected: classificationFields.channel_15 || false
        };
        classification.channel_16 = {
          name: 'P4-O2',
          group: 'chain-4',
          selected: classificationFields.channel_16 || false
        };
        classification.channel_17 = {
          name: 'Fz-Cz',
          group: 'chain-5',
          selected: classificationFields.channel_17 || false
        };
        classification.channel_18 = {
          name: 'Cz-Pz',
          group: 'chain-5',
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

module.exports = router;
