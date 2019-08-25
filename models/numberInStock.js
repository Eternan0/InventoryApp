const mongoose = require('mongoose')

const Schema = mongoose.Schema

const numberInStockSchema = new Schema(
    {
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },

        status: {
            type: String,
            required: true
        },

        renewStockDate: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('numberInStock', numberInStockSchema)