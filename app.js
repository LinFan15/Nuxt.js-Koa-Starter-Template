var Koa = require('koa')
var app = new Koa()
var Nuxt = require('nuxt')
var Sequelize = require('sequelize')

var config = require('./nuxt.config.js')

config.dev = !(app.env === 'production')

var nuxt = new Nuxt(config)


// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

const sequelize = new Sequelize('db', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports.sequelize = sequelize

var User = require('./models/user').User

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  })
})

var router = require('./routes.js').router

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx, next) => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  await nuxt.render(ctx.req, ctx.res)
})

app.listen(3000)
