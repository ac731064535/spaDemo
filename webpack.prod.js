const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const config_base = require('./webpack.base.js');

module.exports = merge(config_base,{
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ]
})
