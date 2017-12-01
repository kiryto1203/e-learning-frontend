const path = require('path');

module.exports = {
  entry: './admin/assets/js/elearning/login.js',
  output: {
    filename: 'login.js',
    path: path.resolve('./admin/assets/js','dist')
  }
};
