const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    signup: './src/allTests/signup.test.js',
    login: './src/allTests/login.test.js',
    home: './src/allTests/home.test.js',
    product: './src/allTests/product.test.js',
    orderFlow: './src/allTests/orderFlow.test.js',    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};
