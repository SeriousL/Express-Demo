var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var model = require('../models/model');
var config = require('../config');

//显示主页
exports.showIndex = function (req, res) {
    //读取模板
    res.render('index');
}
//显示添加页面
exports.shouAdd = function (req, res) {
    res.render('add');
}
//添加操作
exports.doAdd = function (req, res) {

    //使用文件上传处理第三方包 formidable
    //创建实例
    var form = new formidable.IncomingForm();
    //配置属性
    //配置上传文件保存路径
    form.uploadDir = config.upload_dir.abs;
    //配置保存扩展名
    form.keepExtensions = true;
    //调用parse方法  数据存在了回调函数中了
    //三个参数 第一个是错误信息 第二个是存放字段(也就是普通数据) 第三个存放上传文件的信息.
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err
        }
        //body是一个对象 用来存储用户上传的数据   
        //先把普通信息存起来
        var body = fields;
        //处理图片路径信息
        body.avatar = path.basename(files.avatar.path);
        //读取数据
        model.add(body, function (err) {
            if (err) {
                return res.json({
                    err_code: 500,
                    message: err.message
                })
            }
            res.json({
                err_code: 0
            })
        });
    });
}

//查看信息
exports.showInfo = function (req, res) {
    //获取id
    var id = req.query.id;
    //console.log(typeof id);//string
    model.getById(id, function (err, hero) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        console.log(hero);

        hero.avatar = '/' + path.join(config.upload_dir.rel, hero.avatar).replace(/\\/g, '/');

        res.render('info', {
            hero: hero
        });
    });
}
//显示编辑页面
exports.showEdit = function (req, res) {
    var id = req.query.id;
    model.getById(id, function (err, hero) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        hero.avatar = '/' + path.join(config.upload_dir.rel, hero.avatar).replace(/\\/g, '/');
        res.render('edit', {
            hero: hero
        })
    });
}

//操作编辑页面
exports.doEdit = function (req, res) {
    //获得页面数据
    var form = new formidable.IncomingForm();
    form.uploadDir = config.upload_dir.rel;
    //配置保存扩展名
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        var body = fields;

        //判断图片是否更改
        console.log(files.avatar);
        if (files.avatar.size === 0) {
            //页面隐藏域存储原图片路径
            body.avatar = path.basename(body.origin_avatar);
            
            //删掉空文件
            fs.unlink(files.avatar.path);
        } else {
            //使用新图片路径
            // body.avatar = path.join('img/', path.basename(files.avatar.path));
            body.avatar = path.basename(files.avatar.path);
        }

        //上传修改
        model.updataById(body, function (err) {
            if (err) {
                return res.json({
                    err_code: 500,
                    message: err.message
                })
            }
            res.json({
                err_code: 0
            })
        });
    });
}

//图片上传
exports.doUpload = function (req, res) {
    //使用formidable接收传过来的图片
    //获得页面数据
    var form = new formidable.IncomingForm();
    //存放路径
    form.uploadDir = config.upload_preview.abs;
    //配置保存扩展名
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        //返回一个路径 设置给图片src
        files.avatar.path = files.avatar.path.replace('\\', '/')
        // /public/upload/文件名
        var fileName = path.basename(files.avatar.path)
        var previewUrl = path.join(config.upload_preview.rel, fileName).replace('\\', '/')
        res.json({
            err_code: 0,
            result: '/' + previewUrl
        })
    });
}

//删除操作
exports.doDelete = function (req, res) {
    var id = req.query.id
    model.deleteById(id, function (err) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        res.json({
            err_code: 0
        })
    })
}

//返回数据
exports.getHeros = function (req, res) {
    model.getAll(function (err, data) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }
        data.heros.forEach(function (hero) {
            hero.avatar = '/' + path.join(config.upload_dir.rel, hero.avatar).replace(/\\/g, '/')
        })
        res.json({
            err_code: 0,
            result: data
        })
    })
}