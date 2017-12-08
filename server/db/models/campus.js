'use strict';

const db = require('../index')
const DataTypes = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageURL: {
    type: DataTypes.TEXT,
    defaultValue: 'http://illinois.edu/assets/img/about/landmarks/illini-union.jpg'
  },
  description: {
    type: DataTypes.TEXT
  }
})

module.exports = Campus
