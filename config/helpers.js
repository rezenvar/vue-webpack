
const path = require('path');


exports.root = (pathname) => path.join(__dirname, '../' + pathname);


exports.styleLoader = (prod = false) => ({
    test: /(\.css|\.scss)/,
    exclude: /node_modules/,
    use: [
        'style-loader',
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