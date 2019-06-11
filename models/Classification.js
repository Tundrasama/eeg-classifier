const db = require('mongoose');

const ClassificationSchema = new db.Schema({
  user: String,
  item_01: Boolean,
  item_02: Boolean,
  item_03: Boolean,
  item_04: Boolean,
  item_05: Boolean,
  item_06: Boolean,
  item_07: Boolean,
  item_08: Boolean,
  item_09: Boolean,
  item_10: Boolean,
  item_11: Boolean,
  item_12: Boolean,
  item_13: Boolean,
  item_14: Boolean,
  item_15: Boolean,
  item_16: Boolean,
  item_17: Boolean,
  item_18: Boolean
});

exports = Classification = db.model('classification', ClassificationSchema);
