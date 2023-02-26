const express = require('express')
const appConfig = require('./appConig')
const app = express()
const port = 4399
appConfig(app)
app.listen(port,() => {
    console.log('4399端口启动成功')
})