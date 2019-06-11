// const express = require('express');
// const router = express.Router();

// const Classification = require('./models/Classification');

// // @route  GET api/channels
// // @desc
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
