const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    price: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand', required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    id : {
        type : Schema.Types.ObjectId
    }
})

ItemSchema.virtual('url')

module.exports = mongoose.model('Item', ItemSchema)