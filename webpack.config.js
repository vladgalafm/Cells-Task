const path = require('path'); // The path module provides utilities for working with file and directory paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // mode can be 'development', 'production' or 'none'. 'production' mode enables compressing for output file
  entry: './src/js/index.js', // An entry point indicates which module webpack should use to begin building
  output: { // The output property tells webpack where to emit the bundles it creates and how to name these files
    filename: 'js/main.js', // output.filename tells webpack the name of our bundle
    path: path.resolve(__dirname, 'dist/'), // output.path tells webpack where we want our bundle to be emitted to
    publicPath: '../', // this helps to find correct path to images from style.css
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // context: path.resolve(__dirname, 'dist/css/'),
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                  cascade: false
                })
              ],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      chunkFilename: "[id].css",
    }),
    new CopyWebpackPlugin([
      {
        // test: /\.html$/,
        from: './src/index.html',
        to: path.resolve(__dirname, 'dist/'),
      }
    ])
  ],
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src'),
  //   watchContentBase: true,
  //   overlay: true
  // },
  watch: true,
};

/* main commands:
  npm install

  npm run start
  npm run dev
  webpack
*/