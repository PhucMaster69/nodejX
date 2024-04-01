const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('phucDatabase', 'sa', 'no123', {
  host: '115.75.223.40',
  dialect:'mssql',
  port:'6868',
  logging: false
});


let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


module.exports = connectDB;