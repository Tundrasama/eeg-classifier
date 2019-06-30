const fs = require('fs');
const imgFolder = 'public/media/images';

module.exports = {
  fetchImages: function() {
    const images = [];
    fs.readdirSync(imgFolder).forEach(file => {
      if (file.split('.').pop() == 'png') {
        images.push(file);
      }
    });
    return images;
  }
};
