//category Stock Model File
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        name : {type: String, required : true},
        description: {type: String, required: true},
        id : {type : Schema.Types.ObjectId}
    }
)
CategorySchema
.virtual('url')
.get(function () {
  return '/inventory/category/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema)