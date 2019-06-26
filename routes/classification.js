const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Classification = require('../models/Classification');

//app.get('/', (req, res) => res.send('API Running'));
router.get('/', (req, res) => res.send('API Running'));
// @route  GET api/channels
// @desc
// // @access
// router.get('/channel', async (req, res) => {
//   try {
//     const classification = await Classification.findOne({
//       name: 'Fp1-F7'
//     }).populate('name', 'selected');

//     if (!classification) {
//       return res.status(400).json({ msg: 'No item found...' });
//     }

//     res.json(classification);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.post('/', [], async (req, res) => {
  //res.json({ hello: 'this is a test' });
  console.log('This is a test');

  const { channel_1, channel_2 } = req.body;

  console.log(channel_1, channel_2);
  res.redirect('/');
  //await console.log('Helloooooooooo!');
});

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
