module.exports = {
    signRequire:function (req,res,next) {

    },
    loginRequire:function (req,res,next) {
        var _user = req.session.user;
        if(_user){
            next()
        }else {
            res.redirect("/user/login")
        }
    },
    roleCheck:function (req,res,next) {
        var _user = req.session.user;
        if(_user.role<=10){
            res.redirect("/")
        }
        next()
    }
}
