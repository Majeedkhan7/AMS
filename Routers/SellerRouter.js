const router = require('express').Router()

//import sellerController
const SellerController = require('../Controllers/SellerController.js')

//route for add seller
router.post('/addseller',SellerController.addSeller)

//route for login seller
router.post('/login',SellerController.login)


module.exports = router
