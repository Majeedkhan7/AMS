const db = require('../Models')
const Advertisment = db.Advertisements
const Category = db.Categories
const Seller = db.Sellers
const { Op } = require("sequelize");

//function for add advertisement
const addAdvertisment = async (req,res) =>{
        console.log(req.data);
    if(!req.body.topic){
        res.status(500).send("topic cannot be blank")
    }
    else if (!req.body.description) {
        res.status(500).send("description cannot be blank")
    }
    else if (!req.body.price) {
        res.status(500).send("price cannot be blank")
    }
    else if (!req.file) {
        res.status(500).send("Image file not  upload")
    }
    else if (!req.data) {
        res.status(500).send("sellerId cannot be null")
    }
    else if (!req.body.categoryId) {
        res.status(500).send("categoryId cannot be null")
    }
    else{

        const seller = await Seller.count({where:{id:req.data}})
        if(seller === 0){
            return res.status(500).send("please check sellerId")
        }
        const category = await Category.count({where:{id:req.body.categoryId}})
        if(category === 0){
            return res.status(500).send("please check categoryId")
        }
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        const data ={
            topic:req.body.topic,
            description:req.body.description,
            price:req.body.price,
            img:imgsrc,
            sellerId:req.data, 
            categoryId:req.body.categoryId
        }

        Advertisment.create(data).then(()=>{
            res.status(200).send("Successfully added")
        
        }).catch((error)=>{
            res.status(500).send(error)
        })

    }
}
//function for get(Spcefic user)advertisement
const getAdvertisment = async (req,res) =>{
    const id = req.data
   await Advertisment.findAll({where:{sellerId:id},attributes:["id","topic","description","img","price"]}).then((result)=>{
            if(result.length > 0){
                res.status(200).send(result)
            }
            else{
                res.status(200).send("no data available")
            }
         
        
        }).catch((error)=>{
            res.status(500).send(error)
        })

    
}

//function for Get Specific Advertisement
const editSpecificAdvertisment = async (req,res) =>{
    const {id} = req.params
await Advertisment.findAll(
    {
    where:{id:id},
    attributes: ["id","topic","description","img","price","categoryId"]}).then((result)=>{
        if(result.length > 0){
            res.status(200).send(result)
        }
        else{
            res.status(200).send("no data available")
        }
     
     }).catch((error)=>{
         res.status(500).send(error)
     })

 
}

//function for update advertisement
const updateAdvertisment = async (req,res) =>{

    if(!req.body.topic){
        res.status(500).send("topic cannot be blank")
    }
    else if (!req.body.description) {
        res.status(500).send("description cannot be blank")
    }
    else if (!req.body.price) {
        res.status(500).send("price cannot be blank")
    }
    else if (!req.file) {
        res.status(500).send("Image file not  upload")
    }
    else if (!req.body.categoryId) {
        res.status(500).send("categoryId cannot be null")
    }
    else {
        const category = await Category.count({where:{id:req.body.categoryId}})
        if(category === 0){
            return res.status(500).send("please check categoryId")
        }
        var imgsrc = 'http://127.0.0.1:5000/images/' + req.file.filename
        const id = req.body.id
        const data ={
            topic:req.body.topic,
            description:req.body.description,
            price:req.body.price,
            img:imgsrc,
            categoryId:req.body.categoryId
        }

        Advertisment.update(data,{where :{id:id}}).then(()=>{
            res.status(200).send("Successfully updated")
        
        }).catch((error)=>{
            res.status(500).send(error)
        })

    }
}


//function for delete advertisement
const DeleteAdvertisment = async (req,res) =>{
    const {id} = req.params
    await Advertisment.findOne({where:{id:id}}).then((result)=>{
        if(result === null){
            return res.status(500).send("data not found")
        }else[
             Advertisment.destroy({where:{id:id}}).then(()=>{
                res.status(200).send("Successfully Deleted")
           
           }).catch((error)=>{
               res.status(500).send(error)
           })
        ]
    })


 

    
}
//function for Get All Advertisement 
const getAllAdvertisment = async (req,res) =>{

    const page = parseInt(req.query.page)
    const limit = 10 
    const offset = ((page ? page : 1) - 1 ) * limit ;
    const { count, rows }  = await Advertisment.findAndCountAll({ limit:limit,offset:offset, attributes: ["id","topic","img","price"],order:[['id','DESC']]})
    console.log(rows.length);
    if(rows.length > 0){
     const totallPage  = Math.ceil(count/limit)
     const curentPage = page ? +page : 1
     res.send({
        data:rows,
        totallPage:totallPage,
        curentPage:curentPage
     })
    }
    else{
        res.status(500).send("no data available")
    }
          
    
}

//function for Get Specific Advertisement
const getSpecificAdvertisment = async (req,res) =>{
        const {id} = req.params
    await Advertisment.findAll(
        {
        where:{id:id},
        attributes: ["topic","description","img","price"],
        include: [
        {
            model : Category,
            attributes: ["name"],
        },
        {
            model:Seller,
            attributes: ["fullname","address","city","telephoneNumber"]
           
        }
    ]}).then((result)=>{
        if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(500).send("no data available")
        }
  
         
         }).catch((error)=>{
             res.status(500).send(error.errors[0].message)
         })
 
     
 }
 //function for search Advertisement
const searchAdvertisment = async (req,res) =>{
    
    const page = req.query.page ? parseInt(req.query.page)  : 1
    const value = req.params.value
    const limit = 10 
    const offset = (page - 1 ) * limit ;
    const { count, rows }  = await Advertisment.findAndCountAll({limit:limit,offset:offset,
        where :{
            topic:{
                [Op.like]:'%'+value+'%'
                  }
               },
               attributes: ["id","topic","img","price"], 
               order:[['id','DESC']]

    })

    if(rows.length > 0){
        const totallPage  = Math.ceil(count/limit)
        const curentPage = page ? +page : 1
        res.send({
           data:rows,
           totallPage:totallPage,
           curentPage:curentPage
        })
       }
       else{
           res.status(500).send("no data available")
       }   

 
     
 }
 

//export addvertisement
module.exports = {
    addAdvertisment,
    editSpecificAdvertisment,
    updateAdvertisment,
    getAdvertisment,
    DeleteAdvertisment,
    getAllAdvertisment,
    getSpecificAdvertisment,
    searchAdvertisment
}