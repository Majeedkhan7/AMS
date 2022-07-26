//create seller table
module.exports = (sequelize, DataTypes) =>{
    const Seller =sequelize.define("seller",{
        fullname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        telephoneNumber:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    return Seller
}