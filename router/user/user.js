const express = require('express')
const router = express.Router()
const user = require('../../controller/user/user')

router.post('/login', user.login)
router.get('/get', user.getUserInfo)
module.exports = router