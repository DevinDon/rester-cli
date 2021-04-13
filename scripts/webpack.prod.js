const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: resolve('src/index.ts'),
  // devtool: 'inline-source-map',
  output: {
    path: resolve('bin'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'node',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'templates', to: 'templates', noErrorOnMissing: true },
      ],
    }),
  ],
};
