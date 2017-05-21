'use strict';

const webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path'),
    ENV = process.env.npm_lifecycle_event,
    isDev = ENV === 'start',
    sourcePath = __dirname + '/src/',
    copyFiles = new CopyWebpackPlugin([
        {from: sourcePath + 'static'},
        {from: sourcePath + 'static/img', to: '/img'}
    ]),
    pluginsProvided = new webpack.ProvidePlugin({
        _: 'underscore'
    }),
    extractSass = new ExtractTextPlugin({
        filename: isDev ? 'style.css' : 'style.[hash].css'
    }),
    mainHTML = new HtmlWebpackPlugin({
        template: sourcePath + '/index.ejs'
    });

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

module.exports = () => {

    let config = {};

    config.entry = sourcePath + '/app.js';

    config.output = {
        filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, 'app')
    };

    config.resolve = {
        extensions: ['.js', '.scss']
    };

    config.module = {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                    /*{
                     loader: 'ng-annotate-loader'
                     }*/
                ]
            },

            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed'
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: sourcePath
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: [sourcePath + 'index.ejs', /node_modules/],
                use: ['ngtemplate-loader', 'html-loader']
            }
        ]
    };

    config.plugins = [
        extractSass,
        mainHTML,
        new webpack.NoEmitOnErrorsPlugin(),
        copyFiles,
        pluginsProvided
    ];

    config.watch = true;
    config.watchOptions = {
        ignored: /node_modules/
    };

    config.devtool = 'cheap-module-eval-source-map';

    return config;
};
