const Brand = require('../models/brand')
const mongoose = require('mongoose');

const detail = (req, res) => {
    Brand.findById(req.params.id, (err, obj) => (err) ? res.send(err) : res.send(obj._id))
}


module.exports.brand_details = detail