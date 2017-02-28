var Movie = require("../models/movie");
var Comment = require("../models/comment");
var Category = require("../models/category");
module.exports = {
    Index:function (req,res) {
        Category.find({})
            .populate({
                path: 'movies',
                options: { limit: 6 }
            })
            .exec(function (err,categories) {
                if (err) console.log(err);
                console.log(categories)
                res.render("index",{
                    title:"movie 首页",
                    categories:categories,
                })
        })
    },
    Movie:function (req,res) {
        var id = req.params.id;
        Movie.findById(id,function (err,movie) {
            if (err) console.log(err);
            Comment.find({movie:id})
                .sort({"createAt":-1})
                .populate("from","name")
                .populate("reply.from reply.to",'name')
                .exec(function (err,comments) {
                    if (err) console.log(err)
                    console.log(comments)
                    res.render("movieDetail",{
                        title:"movie" + movie.title,
                        movie:movie,
                        comments:comments
                })
            })
        })
    },
    Search:function (req,res) {
        var keyword = req.query.keyword;
        var categoryId = req.query.category;
        var page = parseInt(req.query.page)||1;
        var count = 2;
        var index = parseInt((page-1)*count);
        //找到相关的分类
        if(keyword){
            var reg = new RegExp(keyword,"ig");
            Movie.find({title:reg})
                .exec(function (err,movies) {
                if(err) console.log(err)
                var totalPage = Math.ceil(movies.length/count);
                console.log(movies)
                movies = movies.slice((page-1)*2,(page-1)*2+2)
                console.log(movies)
                res.render("result",{
                    title: keyword,
                    movies:movies,
                    totalPage:totalPage,
                    currentPage:page,
                    keyword:keyword
                })
            })
        }else {
            Category.findById(categoryId,function (err,category) {
                if(err) console.log(err);
                var totalPage = Math.ceil(category.movies.length/count);
                Category.find({_id:categoryId})
                    .populate({
                        path:"movies",
                        options:{limit:count,skip:index}
                    })
                    .exec(function (err,category) {
                        if(err) console.log(err)
                        res.render("result",{
                            title: category[0].name,
                            movies:category[0].movies,
                            totalPage:totalPage,
                            currentPage:page,
                            category:categoryId
                        })
                    })
            })
        }
    }
}