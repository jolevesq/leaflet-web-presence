const path = require('path');
const webpack = require('webpack');

const childProcess = require('child_process');
const package = require('./package.json');

module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === 'production' ? '/leaflet-web-presence/' : '/leaflet-web-presence/',
  outputDir: path.join(__dirname, `/dist`),

  configureWebpack: (config, argv) => {
    const pluginName = 'leaflet-web-presence';
    const mode = process.env.NODE_ENV;
    config.devtool = (mode === 'development') ? 'eval-source-map' : 'source-map';

    // get the right file for source map. Vue add hash to file name so it is hard to find the right one
    config.output.devtoolModuleFilenameTemplate = (info) => {
      const isGeneratedDuplicate = info.resourcePath.match(/\.vue$/) && info.allLoaders;
      if (isGeneratedDuplicate) {
        return `webpack-generated:///${info.resourcePath}?${info.hash}`;
      }
      return `webpack:///${path.normalize(info.resourcePath)}`;
    };
    config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]';

    //config.entry = ['./src/loader.js'];

    console.log(config.output);
    config.output.filename =  `${pluginName}.js`;

    // get version numbers
    const [major, minor, patch] = package.version.split('.');
    // get the hash of the current commit
    const hash = JSON.stringify(
        childProcess
            .execSync('git rev-parse HEAD')
            .toString()
            .trim()
    );
    config.plugins.push(new webpack.DefinePlugin(
      {
        __VERSION__: {
          major,
          minor,
          patch,
          timestamp: Date.now(),
          hash
        }
      }
    ));
  },
  chainWebpack: config => {
    // config
    // .plugin('html')
    // .tap(args => {
    //   args[0].title = 'My title of course'
    //   return args
    // })
  }
};