const Item = require('../models/item')
const brand = require('../controllers/brandController')
const category = require('../controllers/categoryController')

const list = (req, res) => {
    Item.find((err, items) => err ? res.send(err) : res.json(items))
}

const detail = (req, res) => {
    Item.findById(req.params.id, (err, doc) => err ? res.send(err) : res.send(doc))
}

const create = (req, res) => {

    const { price, name, brand, description, category } = req.body

    const item = new Item({ price, name, brand, description, category })

    item.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Item"
        })
    })
}

module.exports.item_list = list
module.exports.item_details = detail
module.exports.item_create = create