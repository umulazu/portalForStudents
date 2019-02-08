const path = require('path');
const webpack = require('webpack');
const serverConfig = require('../server/development.server.config');
const autoprefixer = require('autoprefixer');

const root = path.join(__dirname, '..');

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: true,
        localIdentName: '[local]__[hash:base64:5]',
        minimize: true
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: true,
        minimize: true
    }
}

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
            autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            })
        ]
    }
}

module.exports = {
    mode: 'development',
    devtool: false,

    entry: {
        main: [
            '@babel/polyfill',
            path.join(root, 'client', 'main.js')
        ],
    },

    output: {
        filename: '[name].js',
        path: path.join(root, 'dist', 'public', 'assets'),
        publicPath: serverConfig.assetsRoot
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(root, 'client'),
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', CSSLoader, postCSSLoader, 'sass-loader']
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    CSSModuleLoader,
                    postCSSLoader,
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules\\[*lodash*|react\-dom\-factories]/,
                    name: 'vendors',
                    chunks: 'initial'
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(root, 'public', 'assets'),
        publicPath: '/',
        port: 3001,
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchContentBase: true
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale?!\\ru.js$/, /moment$/),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        })
    ]
};