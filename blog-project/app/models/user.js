var mongoose = require ("mongoose");
mongoose.Promise = Promise;
var UserSchema = require("../schemas/user")
var User = mongoose.model("User",UserSchema)
module.exports = User

