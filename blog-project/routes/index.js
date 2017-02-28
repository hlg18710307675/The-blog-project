var express = require ("express");
var router = express.Router();
var Index = require("../app/controllers/index");
//首页路由
router.get("/",Index.Index)
//详情页路由
router.get("/movie/:id",Index.Movie)
//分类搜索
router.get("/result",Index.Search)
module.exports = router
