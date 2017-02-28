var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//创建评论的数据模型
var CategorySchema = new mongoose.Schema({
    name:String,
    movies:[
        {type:ObjectId,ref:"Movie"}
    ],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
//每次存入是执行的函数
CategorySchema.pre("save",function (next) {
    //如果该条数据是新数据
    if (this.isNew){
        //将该条数据的创建时间和更新时间都设置为当前时间
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    //如果不是只设置更新时间
    else {
        this.meta.updateAt = Date.now()
    }
    next()
})
CategorySchema.statics = {
    fetch:function (cb) {
        return this
            .find({})
            .sort({"meta.createAt":-1})
            .exec(cb)
    },
    findById:function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports = CategorySchema

