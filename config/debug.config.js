const path = require('path');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { root } = require('./helpers.js');

config.plugins[0].definitions.__DEV__ = true;
config.plugins[0].definitions.__IsLocal__ = false;

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);

config.entry = [
    'webpack-dev-server/client?http://localhost:8288',
    'webpack/hot/only-dev-server',
    root('src/js/app.js')
];

const server = new webpackDevServer(webpack(config), {
    port: 8288,
    host: 'localhost',
    publicPath: '/',
    contentBase: 'dist',
    hot: true
});

server.listen(8288);




