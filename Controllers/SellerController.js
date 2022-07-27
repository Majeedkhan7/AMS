const db = require('../Models')
const Seller = db.Sellers
const bcrypt = require('bcrypt');
const saltRounds = 10;


const jwt = require('../jwt/index.js')

// Reister the Seller
const addSeller = async (req,res)=>{

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
            res.status(404).send(error.errors[0].message)
        })
    }else{
        res.send('this email already exists!');
    }

   
}
//function for login seller
const login = async (req,res)=>{

    if(!req.body.email){
        return res.status(404).send("email cannot be blank"); 
     }
    if(!req.body.password){
       return res.status(404).send("password cannot be blank"); 
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
            res.status(404).send("you entered wrong password"); 
        }
        
      }
}



 
module.exports ={
    addSeller,
    login
}
