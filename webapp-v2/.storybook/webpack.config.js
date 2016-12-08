/* eslint-disable */
require('colors');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
     './public/index.js',
    ],
    output: {
        path: __dirname + '/public/static/',
        publicPath:'/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: [/node_modules/, /static/],
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        }]
    },
    postcss: function() {
        return [precss, autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
/* eslint-enable */
