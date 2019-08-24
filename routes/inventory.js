var express = require('express');
var router  = express.Router({mergeParams: true});
var item_controller = require ('../controllers/itemsController')
var Item = require ('../models/item')
/* GET users listing. */
router.get('/', (item_controller.item_list))

router.get('/:id', (item_controller.item_details))

router.post('/create', (item_controller.item_create))

module.exports = router;