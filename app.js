var path = require('path');
//引入express
var express = require('express');
//引入模板引擎
var template = require('art-template');
//引入路由
var router = require('./routers/router');
//配置文件
var config = require('./config');
//创建一个应用
var app = express();


//artTemplate配置模板引擎
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');

// var ejs = require('ejs');
// //  console.log(ejs);

// ejs.delimiter = '{{';
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');
// app.set('views', './views/');



//静态资源加载
// app.use(express.static('public'));
// app.use('/node_modules', express.static('node_modules'));

//加载静态资源
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.use('/public/', express.static(path.join(__dirname, './public/')));



//加载容器路由
app.use(router);
//监听3000端口
app.listen(3000, function () {
  console.log('running');
});