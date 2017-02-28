var Movie = require("../models/movie");
var Category = require("../models/category");
//一个可以把对象里的属性替换成新的值插件
var _ = require("underscore");
module.exports = {
    New:function (req,res) {
        Category.find({},function (err,categories) {
            if(err) console.log(err)
            res.render("movieInput",{
                title:"movie 后台录入页",
                movie:{
                    _id:undefined,
                    title:"",
                    doctor:"",
                    country:"",
                    language:"",
                    poster:"",
                    flash:"",
                    year:"",
                    summary:"",
                    category:""
                },
                categories:categories
            })
        })
    },
    Update:function (req,res) {
        var id = req.params.id;
        if(id){
            Movie.findById(id,function (err,movie) {
                Category.find({},function (err,categories) {
                    if(err) console.log(err)
                    res.render("movieInput",{
                        title:"movie 后台更新",
                        movie:movie,
                        categories:categories
                    })
                })
            })
        }
    },
    Save:function (req,res) {
        var id = req.body.movie._id;
        var movieObj = req.body.movie;
        var _movie
        //如果不是新添加的电影
        if (id!=="undefined"){
            //更新
            Movie.findById(id,function (err,movie) {
                if (err) console.log(err);
                _movie = _.extend(movie,movieObj);
                _movie.save(function (err,movie) {
                    if(err) console.log(err)
                    res.redirect("/admin/movie/list")
                })
            })
        }
        //是新添加的电影
        else {
            var categoryName = movieObj.categoryName;
            //不是新添加的分类
            if(!categoryName){
                _movie = new Movie({
                    category:movieObj.category,
                    doctor:movieObj.doctor,
                    title:movieObj.title,
                    country:movieObj.country,
                    language:movieObj.language,
                    year:movieObj.year,
                    poster:movieObj.poster,
                    summary:movieObj.summary,
                    flash:movieObj.flash
                })
                _movie.save(function (err,movie) {
                    if (err) console.log(err)
                    Category.findById(_movie.category,function (err,category) {
                        if (err) console.log(err)
                        category.movies.push(movie._id);
                        category.save(function (err,category) {
                            if(err) console.log(err)
                            res.redirect("/admin/movie/list")
                        })
                    })
                })
            }
            else {
                //创建新分类对象
               var _categoryObj = {
                   name:categoryName
               }
               //创建新分类数据模型
               var category = new Category(_categoryObj);
               //保存到数据库
               category.save(function (err,category) {
                   if(err) console.log(err);
                   //讲电影存到新分类下
                   _movie = new Movie({
                       category:category._id,
                       doctor:movieObj.doctor,
                       title:movieObj.title,
                       country:movieObj.country,
                       language:movieObj.language,
                       year:movieObj.year,
                       poster:movieObj.poster,
                       summary:movieObj.summary,
                       flash:movieObj.flash
                   })
                   _movie.save(function (err,movie) {
                       if (err) console.log(err)
                       Category.findById(_movie.category,function (err,category) {
                           if (err) console.log(err)
                           category.movies.push(movie._id);
                           category.save(function (err,category) {
                               if(err) console.log(err)
                               res.redirect("/admin/movie/list")
                           })
                       })
                   })
               })
            }
        }
    },
    List:function (req,res) {
        Movie.find({})
            .populate("category","name")
            .exec(function (err,movies) {
            if (err) console.log(err);
            res.render("movieList",{
                title:"movie 列表页",
                movies:movies
            })
        })
    },
    Del:function (req,res) {
        var id = req.query.id;
        if(id){
            console.log(1)
            console.log(id)
            Movie.findById(id,function (err,movie) {
                var categoryId = movie.category;
                Category.findById(categoryId,function (err,category) {
                    category.movies = category.movies.filter(function (ele) {
                        return ele != id
                    })
                    category.save(function (err,category) {
                        if(err) console.log(err)
                        Movie.remove({_id:id},function (err,movie) {
                            if (err) console.log(err);
                            res.json({success:1})
                        })
                    })
                })
            })
        }
    }
}
