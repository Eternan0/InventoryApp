const mongoose = require('mongoose')
const createError = require('http-errors'); 
const Item = require('../models/item')
mongoose.set('useFindAndModify', false)


const list = (req, res) => {
    Item.find((err, items) => err ? res.send(err) : res.json(items))
}

const detail = (req, res) => {
    Item.findById(req.params.id, (err, doc) => err ? res.send(err) : res.send(doc))
}

const deleteItem = (req, res) => {
    Item.findByIdAndRemove(req.params.id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
}
// ##########
// ##########
// add the feature of being able to change field without changing all, and not getting null value on unchanged field.
// ##########
// ##########
const update = (req, res) => {
    const { id } = req.params
    Item
        .findByIdAndUpdate(id, req.body, {new: true})
        .then(item => item ? res.send(item) : res.status(404).send({message: "item not found with id : " + id}))
}

const create = (req, res) => {
    const { price, name, brand, description, category } = req.body

    const item = new Item({ price, name, brand, description, category})

    if (!mongoose.Types.ObjectId.isValid(brand))
        res.status(500).send({ message: "Invalid ID" })

    if (!mongoose.Types.ObjectId.isValid(category))
        res.status(500).send({ message: "Invalid ID" })

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
module.exports.item_delete = deleteItem
module.exports.item_update = update
