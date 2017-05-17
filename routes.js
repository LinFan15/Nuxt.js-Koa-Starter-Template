var router = require('koa-router')()
var userController = require('./controllers/userController')

router.get('/users', async (ctx, next) => {
  await userController.getUsers(ctx)
})

module.exports.router = router
