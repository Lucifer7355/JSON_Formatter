const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

module.exports = {
  entry: './app.js',  // Path to your app.js
  output: {
    filename: 'bundle.js',  // Output file
    path: path.resolve(__dirname, 'dist')  // Output directory
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)  // Replace the API_URL with the value from the .env file
    })
  ],
  mode: 'production'  // You can also use 'development' for development mode
};
