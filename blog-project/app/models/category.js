var mongoose = require("mongoose");
mongoose.Promise = Promise;
var Category = require("../schemas/category");
var Category = mongoose.model("Category",Category);
module.exports = Category
