const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');//一个容器，可以把webpack处理后的文件传递给一个服务器
const webpackHotMiddleware = require('webpack-hot-middleware');
const merge = require('webpack-merge');

const app = express();
const config_base = require('./webpack.base.js');
const config_dev = merge(config_base,{
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['./main.js','webpack-hot-middleware/client'],
    output: {
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});
//使用webpack进行转译，转译到publicPath，而使用cli则是转译到output.path
const compiler = webpack(config_dev); //使用webpack进行转译，相当于webpack webpack.base.js
// Tell express to use the webpack-dev-middleware and use the webpack.base.js
// configuration file as a base.
//把webpack转译后的文件传递给服务器
app.use(webpackDevMiddleware(compiler, {
    noInfo:true, publicPath: config_dev.output.publicPath
}));
app.use(webpackHotMiddleware(compiler,{
    log: console.log, publicPath: config_dev.output.publicPath
}));
// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});