var Item = require('../models/item')
var mongoose = require('mongoose');
var brand = require('../controllers/brandController')
var category = require('../controllers/categoryController')


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

exports.item_create = (req, res) =>{
        // Create a Item       
    const item = new Item({
    price: req.body.price,
    name: req.body.name,
    brand: brand.brand_details(req.body.brand),
    description: req.body.description,
    category: category.category_details(req.body.category)
    //id: mongoose.Types.ObjectId
    });
    console.log(
        item.price, item.name, item.brand, item.description, item.category
    )

    item.save()
        .then(data => {
        res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error "
            });
        });
};
