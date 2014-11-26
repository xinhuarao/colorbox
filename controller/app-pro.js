var apps = require('../models/app-pro');
var baseRes = require('./baseResponse');
var Apps = {};

Apps.get = function(req, res){
    apps.query(apps,req.query, function(data){
        res.end(baseRes({app: data[0]}));
    });
};

Apps.add = function(req, res){
    apps.query(apps,{name: req.body.name},function(list){
        if(list.length){
            res.end(baseRes({errorMsg: ['应用已经存在']}));
        }else{
            req.body.user = req.session.user.login;
            req.body.createDate = new Date();
            
            apps.add(req.body, function(data){
                res.end(baseRes({app: data[0]}));
            });
        }
    });
};

Apps.save = function(req, res){
    apps.update(apps,req.body, function(){
        res.end(baseRes());
    });
};

Apps.del = function(req, res){
    apps.del(apps,req.body, function(){
        res.end(baseRes());
    });
};

Apps.get_user_apps = function(req, res){
    apps.query(apps,{user: req.session.user.login}, function(list){
        res.end(baseRes({apps: list}));
    },{jade: 0, css: 0, js: 0});
};

Apps.get_published_apps = function(req, res){
    //拼接模糊查询
    var param = {};
    var opera = {
        limit: 8
    };
    opera.sort = {};
    req.query.name && (param.name = new RegExp(req.query.name));
    req.query.sort && (opera.sort[req.query.sort] = -1);
    req.query.skip && (opera.skip = req.query.skip * 8);

    apps.operaQuery(param, function(list){
        res.end(baseRes({apps: list}));
    }, {jade: 0, css: 0, js: 0}, opera);
};

Apps.get_app_item = function(req, res){
    var data = req.query;

    data.search = {
        'files.id': +data.id
    };

    mock.queryItem(data,function(data){
        res.end(baseRes({node:data[0].list}));
    });
};

Apps.get_app_items = function(req,res){
    mock.query(req.query,function(list){
        res.end(baseRes({nodes:list[0]}));
    },{'files.content':0});
};

Apps.post_add_app_item = function(req,res){
    mock.addItem(req.body,function(data){
        res.end(baseRes(data));
    });
};

Apps.post_update_app_item = function(req,res){
    mock.updateItem(req.body,function(data){
        res.end(baseRes({mock:data[0]}));
    });
};

Apps.post_del_app_item = function(req,res){
    mock.deleteItem(req.body,function(){
        res.end(baseRes({}));
    });
};

module.exports = Apps;