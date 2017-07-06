
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


exports.root = (pathname) => path.join(__dirname, '../' + pathname);


exports.styleLoader = (prod = false) => ({
    test: /(\.css|\.scss)/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
            {
                loader: 'css-loader',
                options: { sourceMap: !prod, minimize: prod }
            },
            {
                loader: 'autoprefixer-loader',
                options: { browsers: ['last 5 versions'] }
            },
            'sass-loader'
        ]
    })
})