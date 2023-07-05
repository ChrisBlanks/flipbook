const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', //development only
  devtool: 'inline-source-map', //development only debugging
  entry: {
    index: './src/index.js',
  }, 
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Interactive Book'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: "assets/books/[name][ext]"
  },
  module :{
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|txt)$/i,
            type: 'asset/resource'           
        }
    ]
  }
};