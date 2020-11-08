const path = require('path')
const nodeExternals = require('webpack-node-externals')

const mainDirectory = __dirname

module.exports = {
  entry: {
    main: path.resolve(mainDirectory, 'src/main.ts'),
    preload: path.resolve(mainDirectory, 'src/preload.ts'),
  },
  target: 'electron-main',
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
            },
          },
          {
            loader: 'webpack-preprocessor-loader',
            options: {
              params: {
                ENV: process.env.NODE_ENV,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}
