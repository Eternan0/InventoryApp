const Category = require('../models/category')
const mongoose = require('mongoose');

const detail = (req, res) => {
    Category.findById(req.params.id, (err, obj) => err ? res.send(err) : res.send(obj._id))
}

module.exports.category_details = detail