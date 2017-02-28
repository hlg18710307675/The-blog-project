var express = require ('express');
var path = require ("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require ("mongoose");
var mongoStore = require("connect-mongo")(session);
var morgan = require("morgan");

//链接数据库
mongoose.connect(require("./dbUrl").dbUrl);
// 设置端口；
var port = process.env.PORT || 3000;
//启动web服务器并赋给变量app
var app = express();
//给模板文件传递moment处理时间插件
app.locals.moment = require("moment");
//静态资源文件处理
app.use(express.static(path.join(__dirname,"public")));
//利用bodyParser接收表单数据
app.use(bodyParser.urlencoded({extended:true}))
//
app.use(cookieParser())
//
app.use(session({
    secret:"movie",
    store:new mongoStore({
        url:require("./dbUrl").dbUrl,
        collection:"sessions"
    })
}))
//设置视图的根目录
app.set("views","./app/views/pages");
//设置默认的模板引擎
app.set("view engine","jade");
//监听端口
app.listen(port)
//打印日志，确认服务是否启动
console.log("movie started on port" + port);
//中间件;用户回话状态持久化
app.use(function (req,res,next) {
    var _user = req.session.user;
    //将_user传到本地变量上
    app.locals.user = _user;
    next()
})

//配置开发环境的相关配置
if ("development"===app.get("env")){
    //打印错误信息
    app.set("showStackError",true)
    //打印请求方式，请求路径及其状态
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    //格式化源码
    app.locals.pretty = true
    //打开mongoose的debug
    // mongoose.set("debug",true)
}

//路由中间件
var index = require("./routes/index");
var movie = require("./routes/movie");
var user = require("./routes/user");

app.use("/",index);
app.use("/admin",movie);
app.use("/user",user);






