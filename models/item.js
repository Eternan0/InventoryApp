//This is the ITEM Model File
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
    {
        price: {type: Number, required: true},
        name: {type: String, required: true},
        brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
        description: {type: String, required: true},
        category: {type: Schema.Types.ObjectId, ref: 'Category'},
        //numberInStock: {type : Schema.Types.ObjectId, ref: 'NumberInStock'},
        id : {type : Schema.Types.ObjectId}
    }
)
ItemSchema
.virtual('url')
.get(function () {
  return '/inventory/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema)