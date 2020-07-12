const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./node_modules/nord/src/sass/nord.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
      },
    },
  },
};
