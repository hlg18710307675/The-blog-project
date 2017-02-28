var User = require("../models/user");

module.exports = {
    Login:function (req,res) {
        var _user = req.body.user;
        var name = _user.name;
        var password = _user.password;
        User.findOne({name:name},function (err,user) {
            if (err) console.log(err)
            if(!user){
                res.redirect("/")
            }else {
                user.comparePassword(password,function (err,isMatch) {
                    if(err) console.log(err)
                    if(isMatch){
                        console.log("Password is matched");
                        req.session.user = user;
                        res.redirect("/")
                    }else {
                        console.log("Password is not matched")
                    }
                })
            }
        })
    },
    Sign:function (req,res) {
        var _user = req.body.user;
        User.find({name:_user.name},function (err,user) {
            if (err) console.log(err)
            if (!user) {
                res.redirect("/")
            }else {
                var user = new User(_user);
                user.save(function (err,user) {
                    if (err) console.log(err);
                    req.session.user = user;
                    res.redirect("/")
                    console.log("注册成功")
                })
            }
        })
    },
    LogOut:function (req,res) {
        delete req.session.user;
        res.redirect("/")
    },
    renderSign:function (req,res) {
        res.render("sign",{
            title:"注册页面"
        })
    },
    renderLogin:function (req,res) {
        res.render("login",{
            title:"登录页面"
        })
    },
    List:function (req,res) {
        User.find({},function (err,users) {
            console.log(users)
            if (err) console.log(err)
            res.render("userList",{
                title:'用户列表页',
                users:users
            })
        })
    }
}
