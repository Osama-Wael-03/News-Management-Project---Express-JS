
const database = require('../config/database');

const { DataTypes } = require('sequelize');

const News = database.define('News', {
  news_id: {
    type: DataTypes.BIGINT({ unsigned: true, zerofill: false }),
    primaryKey: true,
    autoIncrement: true
  },
  news_title: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  news_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  news_image: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  is_blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    get(){
      return (this.getDataValue('is_blocked') == false) ? 'Active News' : 'Blocked News';
    }
  },
  views :{
    type : DataTypes.BIGINT({unsigned : true}),
    defaultValue : 0
  }
}, {
  tableName: 'news',
  timestamps: true,
  paranoid: true
});

module.exports = News;