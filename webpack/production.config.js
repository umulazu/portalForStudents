const path = require("path");
const webpack = require("webpack");
const serverConfig = require("./production.server.config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

const root = path.join(__dirname, "..");

const CSSModuleLoader = {
    loader: "css-loader",
    options: {
        modules: true,
        sourceMap: false,
    },
};

const CSSLoader = {
    loader: "css-loader",
    options: {
        modules: false,
        sourceMap: false,
    },
};

const postCSSLoader = {
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        sourceMap: false,
        plugins: () => [autoprefixer()],
        minimize: true,
    },
};

module.exports = {
    mode: "production",

    // performance: {
    //     hints: false,
    // },

    entry: {
        main: ["@babel/polyfill", path.join(root, "client", "main.js")],
    },

    output: {
        filename: "[name].js",
        path: path.join(root, "dist", "public", "assets"),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(root, "client"),
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader" },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader,
                    CSSLoader,
                    postCSSLoader,
                    "sass-loader",
                ],
            },
            {
                test: /\.module\.scss$/,
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader,
                    CSSModuleLoader,
                    postCSSLoader,
                    "sass-loader",
                ],
            },
            {
                // test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[hash:5].[ext]",
                },
            },
        ],
    },

    optimization: {
        // minimize: true,
        // minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: "all",
            minSize: 200000,
            maxSize: 240000,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: "~",
            automaticNameMaxLength: 30,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },

    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            //{from: path.join(root, 'public', 'assets', 'favicon.ico'), to: path.join(root, 'dist', 'public', 'assets', 'favicon.ico')},
            //{from: path.join(root, 'public', 'assets', 'manifest.json'), to: path.join(root, 'dist', 'public', 'assets', 'manifest.json')},

            // {from: path.join(root, 'index.js'), to: path.join(root, 'dist', 'index.js')},
            {
                from: path.join(root, "package.json"),
                to: path.join(root, "dist", "package.json"),
            },
            // {from: path.join(root, 'web.config'), to: path.join(root, 'dist', 'web.config')},
            {
                from: path.join(root, "webpack", "production.server.config.js"),
                to: path.join(
                    root,
                    "dist",
                    "webpack",
                    "production.server.config.js"
                ),
            },
        ]),
    ],
};