const Item = require('../models/item')
const brand_controller = require('../controllers/brandController')
const category_controller = require('../controllers/categoryController')
ObjectId = require('mongoose').ObjectID

const list = (req, res) => {
    Item.find((err, items) => err ? res.send(err) : res.json(items))
}

const detail = (req, res) => {
    Item.findById(req.params.id, (err, doc) => err ? res.send(err) : res.send(doc))
}

const create = (req, res) => {
    const { price, name, brand, description, category } = req.body
    console.log(brand)
    const idBrand = new ObjectId(brand)
    const idCateg = new ObjectId(category)
    const item = new Item({ price, name, idBrand, description, idCateg})

    item.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Item"
        })
    })
    console.log(item)   
}

module.exports.item_list = list
module.exports.item_details = detail
module.exports.item_create = create
