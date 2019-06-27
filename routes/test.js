const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Classification = require('../models/Classification');

router.get('/', (req, res) => {
  console.log(req.body);
  console.log(json(res));
});

module.exports = router;
