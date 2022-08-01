const db = require('../Models')
const Seller = db.Sellers
const bcrypt = require('bcrypt');
const saltRounds = 10;


const jwt = require('../jwt/index.js')

// Reister the Seller
const addSeller = async (req,res)=>{

    if(!req.body.fullname){
        return res.status(500).send("fullname  is required"); 
     }
    if(!req.body.address){
       return res.status(500).send("address  is required"); 
    }
    if(!req.body.email){
        return res.status(500).send("email  is required"); 
     }
    if(!req.body.password){
       return res.status(500).send("password  is required"); 
    }
    if(!req.body.city){
        return res.status(500).send("city  is required"); 
     }
    if(!req.body.telephoneNumber){
       return res.status(500).send("telephoneNumber  is required"); 
    }



    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const info = {
        fullname:req.body.fullname,
        address:req.body.address,
        email:req.body.email,
        password:hash,
        city:req.body.city,
        telephoneNumber:req.body.telephoneNumber

    }

    const seller = await  Seller.findOne({where:{email:info.email}})

    if(seller == null){

        Seller.create(info).then(()=>{
            res.status(200).send("Successfully Registered")
        
        }).catch((error)=>{
            res.status(500).send(error)
        })
    }else{
        res.send('this email already exists!');
    }

   
}
//function for login seller
const login = async (req,res)=>{

    if(!req.body.email){
        return res.status(500).send("email  is required"); 
     }
    if(!req.body.password){
       return res.status(500).send("password  is required"); 
    }
    
    const data ={
        email:req.body.email,
        password:req.body.password
    }

    const seller = await Seller.findOne({where:{email:data.email}})
    if ( seller === null) {
        res.send('user does not exist!');
      } else {
        if(bcrypt.compareSync(data.password,seller.password))
        {
            const accesToken = jwt.generateAccessToken(seller.id)
            res.status(200).send({accesToken:accesToken}); 
        }else{ 
            res.status(500).send("you entered wrong password"); 
        }
        
      }
}



  
module.exports ={
    addSeller,
    login
}
