var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: __dirname + "/dist",
    filename:'js/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, './src/'),
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          "presets": ["latest"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        })
      }
    ],
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
};
