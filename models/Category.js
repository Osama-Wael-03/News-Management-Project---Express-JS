
const database = require('../config/database');

const { DataTypes } = require('sequelize');

const Category = database.define('Category', {
  category_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING(60),
    allowNull: {msg : 'Category Name Cannot Be Empty !'}
  }
},
  {
    timestamps: true,
    tableName: 'categories',
    paranoid: true
  });

module.exports = Category;