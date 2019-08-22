var Item = require('../models/item')
var Brand = require('../models/brand')
var NumberInStock = require('../models/numberInStock')
var Category = require('../models/category')
var mongoose = require('mongoose');

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
        // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Item content can not be empty"
        });
    }
        // Create a Item
    const item = new Item({
    price: req.body.price, 
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    category: req.body.category
    //id: mongoose.Types.ObjectId
    });
    item.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Item Created successfully')
    })
};
