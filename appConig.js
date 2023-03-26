const userRouter = require('./router/user/user')

const appConfig = (app) => {
  app.use('/api', userRouter)
}
module.exports = appConfig