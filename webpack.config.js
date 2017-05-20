'use strict';

const webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    TransferWebpackPlugin = require('transfer-webpack-plugin'),
    path = require('path');

/*
module.exports = {

    entry : __dirname + '/src/enter',

    output: {
        path: __dirname + '/app',
        filename: '/build.[hash].js'
    },

    resolve: {
        extensions: ['.js', '.scss']
    },

    module: {
        loaders: [
            {
                test:   /\.js$/,
                exclude: /node_modules/,
                loaders: ['ng-annotate', 'babel?presets[]=es2015']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css!resolve-url!sass?config=sassLoaderConfig'
                })
                //loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?config=sassLoaderConfig')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file?name=/src/[name].[hash].[ext]',
            },
            {
                test: /\.html$/,
                exclude: __dirname + '/src/index.ejs',
                loader: 'ngtemplate!html'
            }
        ]
    },

    sassLoaderConfig: {
        sourceMap: true,
        outputStyle: 'compressed',
    },

    plugins: [
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.DedupePlugin(),

        new ExtractTextPlugin('/style.[hash].css', {
            allChunks: true
        }),

        new webpack.ProvidePlugin({
            _: 'underscore'
        }),

        /!*new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         }
         }),*!/

        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.tpl.html',
            filename: __dirname + '/app/index.html',
            inject: 'head'
        }),

        new TransferWebpackPlugin([
            // Все файлы, перекладываемые в корень 'как есть'
            {from: __dirname + '/src/static'}
        ])
    ],

    watch:  true,
    devtool: 'inline-source-map'
};*/

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app')
    },
    resolve: {
        extensions: ['.js', '.scss']
    }
};
