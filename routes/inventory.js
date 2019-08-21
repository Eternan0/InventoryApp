var express = require('express');
var router  = express.Router({mergeParams: true});
var item_controller = require ('../controllers/itemsController')
var Item = require ('../models/item')
/* GET users listing. */
router.get('/', (req, res) => {
  item_controller.item_list(req, res)
})
  //Fonction sensé etre dans le controler ItemsController
  /*Item.find((err, items)=>{
    if (err)
      res.send(err)
    res.json(items)
  })*/
  
router.get('/:id', (req, res)=>{
  item_controller.item_details(req, res)
})
/*
router.route('/')
  .get(item_controller.item_list)
*/
module.exports = router;
