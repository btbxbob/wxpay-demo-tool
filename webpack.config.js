const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node-webkit',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath : './dist/'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options:{
          //optimizeSSR: false,
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
  
};