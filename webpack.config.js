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
        title: 'Interactive Book Reader',
        template: 'src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
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
        },
        {
            test: /\.(ico)$/i,
            type: 'asset/resource',
            generator : {
              filename: "[name][ext]"
            }    
        }
    ]
  }
};