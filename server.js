const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');//一个容器，可以把webpack处理后的文件传递给一个服务器

const app = express();
const config = require('./webpack.config.js');
config.output.publicPath = '/';//为了让临时文件的地址和URL的地址一致
config.devtool = 'inline-source-map'; //将编译后的代码映射回原始源代码，用于检查错误
const compiler = webpack(config); //使用webpack进行转译，相当于webpack webpack.config.js
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
//把webpack转译后的文件传递给服务器
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});