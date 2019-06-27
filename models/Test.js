const db = require('mongoose');

const TestSchema = new db.Schema({
  user: {
    type: String
    //required: true
  }
});

module.exports = Test = db.model('test', TestSchema);
