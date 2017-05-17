const user = require('../models/user').User

module.exports.getUsers = async function (ctx) {
  const users = await user.findAll()
  ctx.body = users
  ctx.status = 200
}
