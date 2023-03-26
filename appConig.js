const express = require('express')
const userRouter = require('./router/user')
const appConfig = (app) => {
    app.use(userRouter)
}
module.exports = appConfig