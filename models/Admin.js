
const database = require('../config/database');

const { DataTypes } = require('sequelize');

const Admin = database.define('Admin', {
  admin_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  admin_name: {
    type: DataTypes.STRING(60),
    allowNull: { msg: 'Name Cannot Be Empty !' }
  },
  admin_email: {
    type: DataTypes.STRING(120),
    allowNull: { msg: 'Email Cannot Be Empty !' },
    unique: { msg: 'Email Must Be Unique !' }
  },
  admin_password: {
    type: DataTypes.STRING(120),
    allowNull: false
  }
},
  {
    timestamps: true,
    tableName: 'admins',
  });

module.exports = Admin;