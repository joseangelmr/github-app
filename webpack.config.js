const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, 'client'),
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            ENV: '"dev"',
            'process.env': {
                NODE_ENV: JSON.stringify('dev'),
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|build/,
                loader: 'babel-loader?cacheDirectory=true'
            }
        ]
    },
    devtool: 'sourcemap'
}