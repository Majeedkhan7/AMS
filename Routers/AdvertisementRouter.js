const router = require('express').Router()
const auth = require('../jwt/')

var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})
var upload = multer({ storage: storage });

//import AdvertisementController 
const AdvertisementController = require('../Controllers/AdvertisementController.js')

//route for add Advertisement
router.post('/seller/adertisment/add',auth.authenticateToken,upload.single('image'),AdvertisementController.addAdvertisment)

//route for get(Spcefic user)Advertisement
router.get('/seller/adertisment/',auth.authenticateToken,AdvertisementController.getAdvertisment)

//route for edit Advertisement
router.get('/seller/adertisment/edit/:id',auth.authenticateToken,AdvertisementController.editSpecificAdvertisment)

//route for update Advertisement
router.put('/seller/adertisment/update',auth.authenticateToken,upload.single('image'),AdvertisementController.updateAdvertisment)

////route for Delete Advertisement
router.delete('/seller/adertisment/:id',auth.authenticateToken,AdvertisementController.DeleteAdvertisment)

//route for get ALL Advertisement
router.get('/user/all',AdvertisementController.getAllAdvertisment)

//route for   get Specific Advertisement
router.get('/user/:id',AdvertisementController.getSpecificAdvertisment)

//route for seaech Specific Advertisement
router.get('/user/search/:value',AdvertisementController.searchAdvertisment)

module.exports = router