//this is the brand Model File
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var BrandSchema = new Schema(
    {
        name: {type: String, required: true},
        id : {type: Schema.Types.ObjectId}
    }
)

module.exports = mongoose.model('Brand',BrandSchema )