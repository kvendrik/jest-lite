const path = require('path');
const webpack = require('webpack');

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
  node: {
    fs: 'empty',
    console: 'mock',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        sideEffects: false,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        stdout: {
          isTTY: true,
        },
        env: {},
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: ['jestLite', '[name]'],
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
