

const webpackConfig = require('./../config/webpack.config.js');


// remove chunk plugin from plugins
let indexOfChunkPlugin = 0;
webpackConfig.plugins.map((item,index) => {
  if (item.hasOwnProperty('chunkNames') && item.hasOwnProperty('minChunks') && item.hasOwnProperty('selectedChunks') ) indexOfChunkPlugin = index;
})
if (indexOfChunkPlugin) webpackConfig.plugins.splice(indexOfChunkPlugin, 1);

delete webpackConfig.entry;
module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
}