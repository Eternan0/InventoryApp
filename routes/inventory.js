var express = require('express');
var router = express.Router();
var item_controller = require ('../controllers/itemsController')
var Item = require ('../models/item')
/* GET users listing. */
router.get('/', function(req, res, next) {
  //Fonction sensé etre dans le controler ItemsController
    Item.find((err, items)=>{
      if (err)
      res.send(err)
      res.json(items)
  })
});

module.exports = router;
