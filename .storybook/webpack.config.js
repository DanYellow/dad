const path = require('path');
var paths = require('./../config/paths');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: paths.appSrc,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}