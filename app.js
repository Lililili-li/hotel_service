const express = require('express')
const appConfig = require('./appConig')
const app = express()
const { jwtAuth } = require('./config/jwt');
const port = 4399
appConfig(app)
app.use(jwtAuth)
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.send({
            status: 401,
            message: '无效的Token',
        })
    }
    res.send({
        status: 500,
        message: '未知的错误'
    })
})
app.listen(port, () => {
    console.log('4399端口启动成功')
})