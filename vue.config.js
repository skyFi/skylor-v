const config = require('config');
const webpack = require('webpack');

const stringifyObject = obj => Object.keys(obj).reduce((memo, key) => {
  memo[key] = JSON.stringify(obj[key]);
  return memo;
}, {});

module.exports = {
  assetsDir: 'public',
  baseUrl: undefined,
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    modules: true,
  },
  devServer: {
    proxy: {
      '/dbdoc': {
        target: config.get('api'),
        pathRewrite: {
          '^/dbdoc': '',
        },
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(stringifyObject({
        CONFIG: config,
      })),
    ],
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'dependency';
      return args;
    });
  },
};
