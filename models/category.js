const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
        name : {
          type: String,
          required : true
        },

        description: {
          type: String,
          required: true
        },

        id : {
          type : Schema.Types.ObjectId
        }
})

CategorySchema
  .virtual('url').get(() => '/inventory/category/' + this._id)

module.exports = mongoose.model('Category', CategorySchema)