const fs = require('fs');
const imgFolder = 'public/media/images';
const Classification = require('./models/Classification.js');
const Image = require('./models/Image.js');

module.exports = {
  testImages: user => {
    return Image.find({}).exec();
  },
  userImages: user => {
    try {
      return Classification.find({ user }, 'picture_path').exec();
    } catch (err) {
      console.log(err.message);
    }
  },
  nextImage: imageList => {
    try {
      console.log('This is the imagelist passed: ' + imageList);
      return Image.findOne(
        {
          picture_path: {
            $nin: imageList
          }
        },
        'picture_path'
      ).exec();
    } catch (err) {
      console.log('User has viewed all available images');
    }
  },
  fetchImages: function() {
    // initially for storing the image directory in an array
    // updating to push all of the contents of the directory into
    // mongoDB
    const images = [];
    fs.readdirSync(imgFolder).forEach(file => {
      if (file.split('.').pop() == 'png') {
        images.push(file);
        // write to model
        //console.log(`Pushing ${file} to MongoDB...`);
        Image.updateOne(
          {
            picture_path: file
          },
          {
            picture_path: file
          },
          {
            upsert: true
          },
          function(err, data) {
            if (err) {
              console.log('MongoDB Images update failed: ' + err.message);
            }
          }
        );
      }
    });
    return images;
  }
};
