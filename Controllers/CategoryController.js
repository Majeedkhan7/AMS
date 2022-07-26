const db = require('../Models/')
const Category = db.Categories

//function for addcategory
const addcategory = async (req,res) =>{
       
        const data ={
            name:req.body.name,
        }

        Category.create(data).then(()=>{
            res.status(200).send("Successfully Category Created")
        
        }).catch((error)=>{
            res.status(404).send(error.errors[0].message)
        })

}

module.exports = {
    addcategory
}
  