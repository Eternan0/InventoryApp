var Item = require('../models/item')
var Brand = require('../models/brand')
var NumberInStock = require('../models/numberInStock')
var Category = require('../models/category')

var async = require ('async')


exports.item_list = (req, res, next) =>{
    Item.find((err, items)=>{
        if (err)
          res.send(err)
        res.json(items)
    })
}

exports.item_details = (req, res) =>{
    const id = req.params.id
    Item.findById(id, (err, doc)=>{
        if(err)
            res.send(err)
        res.send(doc)
    })
}

exports.item_create = (res, req) =>{
    
}