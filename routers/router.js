// if (method == 'get' && pathname == '/') {
//     handler.showIndex(req, res);
// } else if (method == 'get' && pathname == '/add') {
//     handler.shouAdd(req, res);
// } else if (method == 'post' && pathname == '/add') {
//     handler.doAdd(req, res);
// } else if (method == 'get' && pathname == '/info') {
//     handler.showInfo(req, res);
// } else if (method == 'get' && pathname == '/edit') {
//     handler.showEdit(req, res);
// } else if (method == 'post' && pathname == '/edit') {
//     handler.doEdit(req, res);
// } else if (method == 'post' && pathname == '/upload') {
//     handler.doUpload(req, res);
// } else if (method == 'get' && pathname == '/heros') {
//     handler.getHeros(req, res)
// } else if (method == 'get' && pathname == '/delete') {
//     handler.doDelete(req, res);
// } else if (method == 'get' && pathname.indexOf('/node_modules/') == 0 || pathname.indexOf('/img/') == 0 || pathname == '/favicon.ico' || pathname.indexOf('/uploads/') == 0) {
//     handler.loadStatic(req, res);
// }

//引入 express
var express = require('express');
//引入控制器
var handler = require('../controllers/handler');
//创建一个容器路由
var render = express.Router();

render
    .get('/', handler.showIndex)
    .get('/add', handler.shouAdd)
    .post('/add', handler.doAdd)
    .get('/info', handler.showInfo)
    .get('/edit', handler.showEdit)
    .post('/edit', handler.doEdit)
    .post('/upload', handler.doUpload)
    .get('/heros', handler.getHeros)
    .get('/delete', handler.doDelete)

//导出容器路由

module.exports = render;