const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.publicPath = '/editor-layout-with-keyboard/';
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
};
