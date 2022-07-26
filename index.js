//dotenv
require('dotenv').config()

//express
const express = require('express')
const app = express()

//cors
const cors = require('cors')

//body-parser
const bodyParser = require('body-parser')


app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

//category router 
const categoryRouter = require('./Routers/categoryRouter.js')
app.use('/api/category',categoryRouter)

// Seller Router
const sellerRouter = require('./Routers/SellerRouter.js')
app.use('/api/seller',sellerRouter)

// Advertisement Router
const AdvertisementRouter = require('./Routers/AdvertisementRouter.js')
app.use('/api',AdvertisementRouter)

app.all('*',(req,res)=>{
    res.status(404).send("Page Not found")
})

//create server
app.listen(process.env.SERVER_PORT,()=>{
    console.log(`SERVER RUNNING ON ${process.env.SERVER_PORT}`);
})      