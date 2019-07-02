const fs = require('fs');
const imgFolder = 'public/media/images';
const Classification = require('./models/Classification.js');
const Image = require('./models/Image.js');

module.exports = {
  testImages: user => {
    return Image.find({}).exec();
  },
  userImages: user => {
    return Classification.find({ user }, 'picture_path').exec();
  },
  nextImage: imageList => {
    return Image.findOne(
      {
        picture_path: {
          $nin: imageList
        }
      },
      'picture_path'
    ).exec();
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
  // userImages_old: async function(user) {
  //   // deprecated in favor of userImages
  //   var newImages = [];
  //   await Classification.find(
  //     {
  //       // need to replace with actual user here...
  //       user: user
  //     },
  //     'picture_path',
  //     function(err, classifications) {
  //       if (err) return err.message;

  //       userImages = classifications.map(class_ => ({
  //         // could possibly include the forEach up here
  //         // and minimize the code.
  //         filePath: class_.picture_path
  //       }));
  //       console.log('User Images: ' + JSON.stringify(userImages));
  //       return JSON.stringify(userImages);
  //     }
  //   );
  //   // get all file_paths for a user
  //   //actually already done in nextImage...
  //   // next image actually does two things --
  //   // finds the file_paths for images seen by
  //   // the user, and returns the next image
  // },
  // getNextImage: async function(user) {
  //   try {
  //     const userImages = await Classification.find(
  //       {
  //         // need to replace with actual user here...
  //         user: user
  //       },
  //       'picture_path'
  //     );
  //     if (!userImages) {
  //       return JSON.stringify({
  //         success: false,
  //         message: 'no images for user.'
  //       });
  //     }

  //     imageList = userImages.map(function(image) {
  //       // could possibly include the forEach up here
  //       // and minimize the code.
  //       return image.picture_path;
  //     });

  //     console.log('anotherUserImages: ' + imageList);

  //     const nextImage = await Image.find(
  //       {
  //         picture_path: {
  //           $nin: imageList
  //         }
  //       },
  //       'picture_path'
  //     )
  //       .exec()
  //       .then(nextImage => {
  //         console.log('Next Image to Serve: ' + nextImage[0].picture_path);
  //         return nextImage[0].picture_path;
  //       });

  //     if (!nextImage) {
  //       return JSON.stringify({
  //         success: false,
  //         message: 'no new image found.'
  //       });
  //     }

  //     // // testing below, commented out and used .exec().then() --- didn't seem to work either
  //     // if (nextImage) {
  //     //   console.log('Next Image to Serve: ' + nextImage[0].picture_path);
  //     //   return nextImage[0].picture_path;
  //     // } else {
  //     //   return JSON.stringify({
  //     //     success: false,
  //     //     message: 'no new image found.'
  //     //   });
  //     // }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // },
  // nextImage: function(images, user) {
  //   //deprecated using getNextImage instead
  //   var newImages = [];
  //   Classification.find(
  //     {
  //       // need to replace with actual user here...
  //       user: user
  //     },
  //     'picture_path',
  //     function(err, classifications) {
  //       if (err) return err.message;

  //       userImages = classifications.map(class_ => ({
  //         // could possibly include the forEach up here
  //         // and minimize the code.
  //         filePath: class_.picture_path
  //       }));

  //       console.log('User Images: ' + JSON.stringify(userImages));

  //       userClassifications = userImages.length;

  //       console.log(
  //         'User has: ' +
  //           userClassifications +
  //           ' classifications completed out of ' +
  //           images.length +
  //           '.'
  //       );

  //       // was looping through userImages found against
  //       // an image array to remove any matching values
  //       // and then return the first value in the array
  //       userImages.forEach(item => {
  //         var index = images.indexOf(item.filePath);
  //         if (index > -1) {
  //           console.log('Splicing off: ' + item.filePath);
  //           images.splice(index, 1);
  //         }
  //       });

  //       // attempting a MongoDB query to determine
  //       // the next image to be used
  //     }
  //   );
  //   if (images[0]) {
  //     const nextImage = images[0];
  //     console.log('Next image to serve: ' + nextImage);
  //     console.log('Images: ' + images);
  //     return nextImage;
  //   } else {
  //     console.log('User has reviewed all classification images');
  //     return null;
  //   }
  // },
  // updateImageList: function(images, lastImage) {
  //   // should splice the lastImage classified from images and then
  //   // serve the next image
  //   images.forEach(item => {
  //     var index = images.indexOf(lastImage);
  //     if (index > -1) {
  //       images.splice(index, 1);
  //     }
  //   });
  //   if (images[0]) {
  //     const nextImage = images[0];
  //     console.log(
  //       'Removed image ' +
  //         lastImage +
  //         ' from list -- next image is: ' +
  //         nextImage
  //     );
  //     return nextImage;
  //   }
  // }
};
