const router = require('express').Router()

//import CategoryController
const CategoryController  = require('../Controllers/CategoryController.js')

//route for add Category
router.post('/add',CategoryController.addcategory)


module.exports = router