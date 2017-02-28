var express = require ("express");
var router = express.Router();
var Movie = require("../app/controllers/movie");
var Auth = require("../app/middleware/auth");
var Category = require("../app/controllers/category");
var upload = require("../app/middleware/upload");

//后台录入页路由
router.get("/movie",Auth.loginRequire,Auth.roleCheck,Movie.New)
//更新
router.get("/movie/update/:id",Auth.loginRequire,Auth.roleCheck,Movie.Update)
//后台录入post来的数据
router.post("/movie/new",Auth.loginRequire,Auth.roleCheck,Movie.Save)
//列表页路由
router.get("/movie/list",Auth.loginRequire,Auth.roleCheck,Movie.List)
//删除
router.delete("/movie/del",Auth.loginRequire,Auth.roleCheck,Movie.Del)

//电影分类录入页
router.get("/movie/category",Category.CategoryNew)
//电影分类更新
router.get("/movie/category/update/:id",Auth.loginRequire,Auth.roleCheck,Category.CategoryUpdate)
//电影分类录入
router.post("/movie/category/new",Category.CategorySave)
//电影分类列表页
router.get("/movie/category/list",Category.CategoryList)
//电影分类删除
router.delete("/movie/category/del",Auth.loginRequire,Auth.roleCheck,Category.CategoryDel)

module.exports = router
