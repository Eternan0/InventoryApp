var Brand = require('../models/brand')
var mongoose = require('mongoose');

exports.brand_details = (req, res) =>{
    const id = req.params.id
    Brand.findById(id, (err, obj)=>{
        if(err)
            res.send(err)
        res.send(obj)
    })
}
