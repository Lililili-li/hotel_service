const express = require('express')
const indexRouter = require('./router')
const appConfig = (app) => {
    app.use(indexRouter)
}
module.exports = appConfig