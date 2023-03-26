const express = require('express')
const userRouter = require('./router/user/user')

const appConfig = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', userRouter)
}
module.exports = appConfig