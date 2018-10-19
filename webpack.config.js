const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    //由于webpack幕后实现"import"、”export“,所以不需要babel转译器
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'StudyBox',
            template: 'studyOpen.html'
        })
    ]
}