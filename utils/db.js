const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('library-mangement', 'root', 'qwert@4321', {
  host: 'localhost',
  dialect: 'mysql', // or any other dialect like 'mysql', 'sqlite', 'mssql', etc.
});

module.exports =  sequelize