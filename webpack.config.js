const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    core: './src/core.ts',
    enzyme: './src/enzyme.ts',
    prettify: './src/prettify.ts',
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'examples'),
      path.join(__dirname, 'dist'),
    ],
    compress: true,
    port: 9000,
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
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: ['jestLite', '[name]'],
    libraryTarget: 'umd',
  },
};
