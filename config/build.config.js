const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const config = require('./webpack.config.js');
const Visualizer = require('webpack-visualizer-plugin');
const glob = require('glob-all');
const { root, styleLoader } = require('./helpers.js');

config.devtool = '';
config.plugins[0].definitions.__DEV__ = false;
config.plugins[0].definitions.__IsLocal__ = false;
config.module.rules[config.module.rules.length - 1] = styleLoader(true);


config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    minimize: true,
    sourceMap: false,
    exclude: [/node_modules/]
}));

config.plugins.push( new cleanWebpackPlugin( ['dist'], { root: process.cwd() }));
// config.plugins.push(new Visualizer({ filename: './../BundleModulesSchema.html' }));
webpack(config).watch({}, (err, stats) => {
    if (stats) console.log(stats.toString({
        colors: true
    }))
    if (err) console.log('Error ', err);
});