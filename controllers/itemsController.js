var Item = require('../models/item')
var Brand = require('../models/brand')
var NumberInStock = require('../models/numberInStock')
var Category = require('../models/category')

var async = require ('async')


exports.item_list = (res, req) =>{
Item.find().lean().exec(function(err, items){
    return res.end(JSON.stringify(items))
})
}

exports.item_details = (res, req) =>{

}

exports.item_create = (res, req) =>{
    
}