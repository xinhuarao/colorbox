var user = require('../models/user');
var userRule = require('../web/validate/user');
var baseRes = require('./baseResponse');
var registerValid = require('./rules');
var login = {};

//用户登录
login.enter = function(req,res){
    user.query(user,req.body,function(list){
        if(list.length){
            req.session.user = list[0];
            res.end(baseRes());
        }else{
            res.end(baseRes({errorMsg:['用户名或密码不正确']}));
        }
    });
};

//用户注销
login.out = function(req,res){
    req.session.destroy(function(){
        res.redirect(req.headers.referer||'/');
    });
};

//用户注册
login.register = function(req,res){
    var r = registerValid.validate(req.body,userRule);
    if(r.valid){
        user.query(user,{username:req.body.username},function(list){
            if(list.length){
                res.end(baseRes({errorMsg:['用户已存在']}));
            }else{
                user.add(user,req.body,function(data){
                    req.session.user = data[0];
                    res.end(baseRes());
                });
            }
        });
    }else{
        res.end(baseRes(r));
    }

}

module.exports = login;