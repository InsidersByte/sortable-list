const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: ['./pages/index.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'pages'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: 'build',
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loaders: ['style', 'css', 'stylus'],
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            inject: 'body',
            filename: 'index.html',
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
