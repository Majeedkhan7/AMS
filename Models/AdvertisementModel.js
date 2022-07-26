
module.exports = (sequelize, DataTypes) =>{
    const Advertisement =sequelize.define("advertisement",{
        topic:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false,
        },
        img:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    return Advertisement
}