const mongoose = require('mongoose');
const config = require('config');
let db;

console.log(
  process.env.MONGOLAB_URI,
  process.env.NODE_ENV,
  process.env.MONGO_URI
);

if (process.env.NODE_ENV == 'production') {
  // db = process.env.MONGO_URI;
  db = process.env.MONGOLAB_URI;
} else {
  db = config.get('mongoURI');
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('db.js: ' + err.message);
    //Exit process with failure

    //process.exit(1);
  }
};

module.exports = connectDB;
