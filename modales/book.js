const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const book = sequelize.define('book', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currdate: {
        type: DataTypes.DATE, // Changed from INTEGER to DATE
        allowNull: false,
    },
    onehrlatedate: {
        type: DataTypes.DATE, // Changed from INTEGER to DATE
        allowNull: false,
    },
});

sequelize.sync().then(() => {
    console.log("General model synchronized successfully");
});

module.exports = book;