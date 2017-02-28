var mongoose = require("mongoose");
mongoose.Promise = Promise;
var CommentSchema = require("../schemas/comment");
var Comment = mongoose.model("Comment",CommentSchema);
module.exports = Comment
