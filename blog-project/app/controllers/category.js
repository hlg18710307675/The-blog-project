var Category = require("../models/category");
var _ = require("underscore");
module.exports = {
    CategoryNew:function (req,res) {
        Category.find({},function (err,categories) {
            if(err) console.log(err)
            res.render("categoryInput",{
                title:"category 后台录入页",
                category:{
                    name:""
                }
            })
        })
    },
    CategoryUpdate:function (req,res) {
        var id = req.params.id;
        if(id){
            Category.findById(id,function (err,category) {
                if(err) console.log(err)
                res.render("categoryInput",{
                    title:"category 后台更新",
                    category:category
                })
            })
        }
    },
    CategorySave:function (req,res) {
        var id = req.body.category.id;
        var categoryObj = req.body.category;
        var _category
        console.log(id)
        console.log(id != "undefined")
        //如果不是新添加的分类
        if (id !== "undefined"){
            //更新
            Category.findById(id,function (err,category) {
                if (err) console.log(err);
                _category = _.extend(category,categoryObj);
                _category.save(function (err,category) {
                    if(err) console.log(err)
                    res.redirect("/admin/movie/category/list")
                })
            })
        }
        //是新添加的分类
        else {
            _category = new Category(categoryObj)
            _category.save(function (err,category) {
                if (err) console.log(err)
                res.redirect("/admin/movie/category/list")
            })
        }
    },
    CategoryList:function (req,res) {
        Category.fetch(function (err,categories) {
            if (err) console.log(err);
            res.render("categoryList",{
                title:"category 列表页",
                categories:categories
            })
        })
    },
    CategoryDel:function (req,res) {
        var id = req.query.id;
        if(id){
            Category.remove({_id:id},function (err,movie) {
                if (err) console.log(err);
                res.json({success:1})
            })
        }
    }
}
