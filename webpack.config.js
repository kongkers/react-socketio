var webpack = require('webpack');
var path = require('path');

var config = {
    context: __dirname,
    entry: ['bootstrap-loader', './src/app/index'],
    output: {
        path: path.resolve('./public/dist/'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-3']
                }
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }, 
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;