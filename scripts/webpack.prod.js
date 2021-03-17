const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: resolve('src/main/index.ts'),
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
  externals: (() => {
    const dependencies = require('../package.json').devDependencies;
    const externals = {};
    for (const dependency in dependencies) {
      externals[dependency] = 'commonjs ' + dependency;
    }
    return externals;
  })(),
  target: 'node',
};
