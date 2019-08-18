#! /usr/bin/env node

console.log('This script populates some test item, categories, brands and numbersinstock to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Brand = require('./models/brand')
var Category = require('./models/category')
var NumberinStock = require('./models/numberInStock')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []
var brands = []
var numberInStocks = []

//Category Creation Script re-Wrote from the library database filling script
function categoryCreate(name, description, cb) {
  categorydetail = {
    name:name , 
    description: description 
  }
  
  var category = new Category(categorydetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}
//Brand Creation Script re-Wrote from the library database filling script
function brandCreate(name, cb) {
  var brand = new Brand({ name: name });
       
  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Brand: ' + brand);
    brands.push(brand)
    cb(null, brand);
  }   );
}
//Item Creation Script re-Wrote from the library database filling script
function itemCreate(price, name, brand,description, category, cb) {
  itemdetail = { 
    price: price,
    name: name,
    brand: brand,
    description: description,
    category: category
  }

  var item = new Item(itemdetail);    
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}


function numberInStockCreate(item, renewStockDate, status, cb) {
  numberInStockdetail = { 
    item: item,
    renewStockDate: renewStockDate
  }    
  if (status != false) numberInStockdetail.status = status
    
  var numberInStock = new NumberinStock(numberInStockdetail);    
  numberInStock.save(function (err) {
    if (err) {
      console.log('ERROR CREATING numberInStock: ' + numberInStock);
      cb(err, null)
      return
    }
    console.log('New numberInStock: ' + numberInStock);
    numberInStocks.push(numberInStock)
    cb(null, item)
  }  );
}


function createBrandCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Car Related', 'Everything your car need.. We have it ! From pieces to actual car !', callback);
        },
        function(callback) {
          categoryCreate('Food', 'Basic Groceries for you, we have the best chinese noodle ever ! Try some ', callback);        
        },
        function(callback) {
          categoryCreate('Smartphone', 'Samsung, Apple, Huawei, we have them all !', callback);        
        },
        function(callback) {
          categoryCreate('Shoes', 'You like sneakers ? we like them too !', callback);        
        },
        function(callback) {
          brandCreate("BMW", callback);
        },
        function(callback) {
          brandCreate("Opel", callback);
        },
        function(callback) {
          brandCreate("Mercedes", callback);
        },
        function(callback) {
          brandCreate("Addidas", callback);
        },
        function(callback) {
          brandCreate("yeo's", callback);
        },
        function(callback) {
          brandCreate("Xiaomi", callback);
        },
        function(callback) {
          brandCreate("Apple", callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate(40,"brake system", brands[0],'the best braker ! Get it ? ',categories[0], callback);
        },
        function(callback) {
          itemCreate(200,"Xiaomi redmi note 6", brands[5], 'A nice phone for affordable price',categories[2], callback);
        },
        function(callback) {
          itemCreate(50,"addidas sneaker", brands[3], 'the shoes you need',categories[3], callback);
        },
        function(callback) {
          itemCreate(700,"Iphone 8+", brands[6], 'What are those',categories[2], callback);
        },
        function(callback) {
          itemCreate(70,"wheels", brands[2], 'you need them to actually go forward',categories[0], callback);
        },
        function(callback) {
          itemCreate(5,"Instant nooddles", brands[4],'Best Nooddle EVERRRR',categories[1], callback);
        },
        function(callback) {
          itemCreate(8,"Miso soup", brands[4], 'You know just goodall miso soup',categories[1], callback);
        },
        ],
        // optional callback
        cb);
}


function createNumberInStock(cb) {
    async.parallel([
        function(callback) {
          numberInStockCreate(items[0], '10/02/2019', 'Available', callback)
        },
        function(callback) {
          numberInStockCreate(items[1], '10/04/2019', 'Available', callback)
        },
        function(callback) {
          numberInStockCreate(items[2], '10/07/2019', 'Available', callback)
        },
        function(callback) {
          numberInStockCreate(items[3], '24/02/2019', 'Available', callback)
        },
        function(callback) {
          numberInStockCreate(items[4], '31/08/2019', 'Available', callback)
        },
        function(callback) {
          numberInStockCreate(items[5], '12/04/2019', 'Available', callback)
        },
        ],
        // Optional callback
        cb);
}

function howManyItem () {
  console.log('number of categories : '+ categories.length + '\nnumber of brands :'+ brands.length + '\nnumber of items :'+ items.length +'\nnumber of numberinstocks :'+ numberInStocks.length)
}


async.series([
    createBrandCategories,
    createItems,
    createNumberInStock,
    howManyItem
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('numberInStock: '+numberInStocks);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



