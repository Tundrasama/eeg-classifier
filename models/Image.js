const db = require('mongoose');

const ImageSchema = new db.Schema({
  picture_path: { String },
  insertDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = db.model('image', ImageSchema);
