
const database = require('../config/database');

const { DataTypes } = require('sequelize');

const Contact = database.define('Contact', {
  contact_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  gst_full_name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  gst_phone: {
    type: DataTypes.STRING(25),
    unique: { msg: 'Phone Number Must Be Unique !' },
    allowNull: false
  },
  gst_email: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: { msg: 'Email Address Must Be Unique !' }
  },
  guest_message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message_status: {
    type: DataTypes.ENUM(['PENDING', 'RESOLVED', 'CLOSED']),
    allowNull: false , 
    defaultValue : 'PENDING'
  },
},
  {
    timestamps: true,
    tableName: 'contacts',
    paranoid: true
  });

module.exports = Contact;
