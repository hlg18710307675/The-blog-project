//引入建模工具模块
var mongoose = require("mongoose");
//引入bcrypt-nodejs,先生成一个随机的盐，然后将密码和盐组合加密存储
var bcrypt = require("bcrypt-nodejs");
//设置盐的复杂程度
var SALT_WORK_FACTOR = 10;
//创建电影的数据模型
var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        //是否唯一
        unique:true
    },
    password:String,
    //0:normal
    //>=10:admin
    //>=50:super admin
    role:{
        type:Number,
        default:0
    },
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
UserSchema.pre("save",function (next) {
    var user = this;
    //如果该条数据是新数据
    if (this.isNew){
        //将该条数据的创建时间和更新时间都设置为当前时间
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    //如果不是只设置更新时间
    else {
        this.meta.updateAt = Date.now()
    }
    //生成随机盐
    bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {
        if (err) return next(err)
        //将用户密码和盐组合哈希
        bcrypt.hash(user.password,salt,null,function (err,hash) {
            if (err) return next(err)
            //将生成的hash值保存到密码上去
            user.password = hash
            next()
        })
    })
})

UserSchema.methods = {
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if (err) return cb(err)
            cb(null,isMatch)
        })
    }
}
UserSchema.statics = {
    fetch:function (cb) {
        return this
            .find({})
            .sort("meta.updateAt")
            .exec(cb)
    },
    findById:function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}
module.exports = UserSchema
