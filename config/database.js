
  const {Sequelize} = require('sequelize');
  
  const databaseConnection = new Sequelize({
    host : 'localhost',
    port : '3306',
    username : 'root',
    password : '',
    database : 'newsdb',
    dialect : 'mysql'
  }); 

  module.exports = databaseConnection;