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

<<<<<<< HEAD
exports.item_create = (req, res) =>{
        // Create a Item       
    const item = new Item({
    price: req.body.price,
    name: req.body.name,
    brand: brand.brand_details,
    description: req.body.description,
    category: category.category_details
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
=======
module.exports.item_list = list
module.exports.item_details = detail
module.exports.item_create = create
>>>>>>> 07a83e24c4ec5d8dfcc8d0b5695e85c80d8e9b7a
