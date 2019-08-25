var express = require('express');
var router  = express.Router({mergeParams: true});
var item_controller = require ('../controllers/itemsController')
var brand_controller = require ('../controllers/brandController')
var Item = require ('../models/item')

/* GET users listing. */
router.get('/', (item_controller.item_list))

router.get('/:id', (item_controller.item_details))

router.post('/create', (item_controller.item_create))

router.delete('/delete/:id', (item_controller.item_delete))

router.get('/brandDetail/:id', (brand_controller.brand_details))
module.exports = router;