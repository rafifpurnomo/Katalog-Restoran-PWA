const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new GenerateSW({
      swDest: 'service-worker.js', 
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/list\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'mensa-api',
          },
        },
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/detail\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'mensa-api-detail',
          },
        },
        {
          urlPattern: /^https:\/\/restaurant-api\.dicoding\.dev\/images\/small\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'mensa-image-api',
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
};
