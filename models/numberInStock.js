//Number Of Item in Stock Model File
var mongoose = require ('mongoose')

var Schema = mongoose.Schema

var numberInStockSchema = new Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: 'Item'},
        status: {type: String, required: true},
        renewStockDate: {type: String, required: true}
    }
)

module.exports = mongoose.model('numberInStock', numberInStockSchema)