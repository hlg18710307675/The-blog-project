var mongoose = require ("mongoose");
mongoose.Promise = Promise;
var MovieSchema = require("../schemas/movie")
var Movie = mongoose.model("Movie",MovieSchema)
module.exports = Movie
