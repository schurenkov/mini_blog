const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    hot: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:5000/api',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
