const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { root, styleLoader } = require('./helpers.js');
const glob = require('glob-all');


process.env.NODE_ENV = 'development';





module.exports = {
    entry: [
        root('src/js/app.js')
    ],
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: "js/[name].js",
        publicPath: '/',
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            components: root('src/js/components'),
            controls: root('src/js/controls'),
            '@': root('src/js')
        },
        modules: [
            root('src/js'),
            "node_modules"
        ],
        extensions: [".vue", ".js", ".json", ".*"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:  'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            styleLoader(),
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true,
            __isLocal__: false
        }),
        new webpack.ProvidePlugin({
            Vue: 'vue',
            Utils: 'utils',
            Component: ['vue-class-component', 'default'],
            router: ['router', 'default'],
        }),
        new copyWebpackPlugin([
            { from: root('src/index.html'), to: 'index.html' },
            { from: root('src/assets'), to: 'assets' },
        ]),
        new ProgressBarPlugin({
            format: chalk.green(':msg')
            + " "
            + chalk.white(':bar')
            + chalk.yellow.bold(':percent')
            + ' (:elapsed seconds) ',
            clear: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        })
    ],
    devtool: 'eval-source-map'

}



