'use strict';

const webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    path = require('path'),
    ENV = process.env.npm_lifecycle_event,
    isDevelop = ENV === 'develop',
    sourcePath = __dirname + '/src/',
    copyFiles = new CopyWebpackPlugin([
        {from: sourcePath + 'static'},
        {from: sourcePath + 'static/img', to: '/img'}
    ]),
    pluginsProvided = new webpack.ProvidePlugin({
        _: 'underscore'
    }),
    extractSass = new ExtractTextPlugin({
        filename: isDevelop ? 'style.css' : 'style.[hash].css'
    }),
    mainHTML = new HtmlWebpackPlugin({
        template: sourcePath + '/index.ejs'
    }),
    uglifyBundle = new UglifyJSPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    });

module.exports = () => {

    const config = {};

    config.entry = sourcePath + '/app.js';

    config.output = {
        filename: isDevelop ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, 'app'),
        publicPath: '/'
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
                        loader: 'ng-annotate-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer('last 50 versions', '> 1%', 'ie 10')]
                            }
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: 'compact'
                            }
                        },
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
                exclude: sourcePath + 'index.ejs',
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

    if (!isDevelop) {
        config.plugins.push(uglifyBundle);
    }

    config.watch = isDevelop;
    config.watchOptions = {
        ignored: /node_modules/
    };

    config.devServer = {
        contentBase: path.join(__dirname, "app"),
        compress: true,
        port: 5555,
        stats: 'errors-only',
        open: true,
        overlay: true,
        historyApiFallback: {
            disableDotRule: true
        },
        host: 'webpack.local'
    };

    config.devtool = isDevelop ? 'cheap-module-eval-source-map' : 'source-map';

    return config;
};
