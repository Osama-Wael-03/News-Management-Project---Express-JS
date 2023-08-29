
const database = require('../config/database');

const { DataTypes } = require('sequelize');

const Comment = database.define('Comment', {
  comment_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  comment_content: {
    type: DataTypes.STRING(255),
    allowNull: false
  }, 
  commenter_name : {
    type : DataTypes.STRING(60),
    allowNull : false
  },
  comment_reports : {
    type : DataTypes.INTEGER({unsigned : true}),
    defaultValue : 0
  }
},
  {
    timestamps: true,
    tableName: 'comments',
    paranoid: true
  });

module.exports = Comment;