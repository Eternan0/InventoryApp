var Category = require('../models/category')
var mongoose = require('mongoose');

exports.category_details = (req, res) =>{
    const id = req.params.id
    Category.findById(id, (err, obj)=>{
        if(err)
            res.send(err)
        res.send(obj)
    })
}