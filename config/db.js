const mongoose = require('mongoose');
const config = require('config');

console.log(process.env.NODE_ENV, process.env.MONGO_URI);

if (process.env.NODE_ENV == 'production') {
  db = process.env.MONGO_URI;
} else {
  const db = config.get('mongoURI');
}

console.log('mongoURI: ' + db);

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
