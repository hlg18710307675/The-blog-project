var express = require ("express");
var router = express.Router();
var User = require("../app/controllers/user");
var Comment = require("../app/controllers/comment");
var Auth = require("../app/middleware/auth");
//用户注册
router.post("/sign",User.Sign)
//用户登录
router.post("/login",User.Login)
//用户登出
router.get("/logout",User.LogOut)
//登录页
router.get("/sign",User.renderSign)
//注册页
router.get("/login",User.renderLogin)

//用户列表页
router.get("/list",Auth.loginRequire,Auth.roleCheck,User.List)

//评论
router.post("/comment",Auth.loginRequire,Auth.roleCheck,Comment.Save)
module.exports = router
