const { Sequelize, DataTypes } = require('sequelize')

//establish database connection
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:process.env.DB
  });

//Test the Database Connection

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize  

db.Sellers = require('./SellerModel.js')(sequelize,DataTypes)
db.Advertisements = require('./AdvertisementModel.js')(sequelize,DataTypes)
db.Categories = require('./categoryModel.js')(sequelize,DataTypes)

  //foreign key set
db.Sellers.hasMany(db.Advertisements, {
    foreignKey: 'sellerId',
      allowNull:false
  });
  db.Advertisements.belongsTo(db.Sellers);

  //foreign key set
  db.Categories.hasMany(db.Advertisements, {
    foreignKey: 'categoryId',
      allowNull:false
  });
  db.Advertisements.belongsTo(db.Categories);

db.sequelize.sync({
    force:false
}).then(()=>{
    console.log(`sync done`);
})

module.exports = db 