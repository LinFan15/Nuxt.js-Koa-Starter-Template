const Sequelize = require('sequelize')
const sequelize = require('../app').sequelize

module.exports.User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
})
