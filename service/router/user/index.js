const express = require('express')
const useRouter = express.Router()
const dbClient = require('../../db/index')
const md5 = require('../../utils/md5')
// const jwt = require('jsonwebtoken');
// const { decode, jwtConfig } = require('../../config/jwt');

useRouter.post('/login', async (req, res) => {
  console.log(req.headers.authorization);
  let userInfo = {}
  let { account, password } = req.query;
  // 注册时使用
  // password = md5(password);
  dbClient.select('user',{'account': `${account}`,'password': `${password}`},function (err,result) {
    if (err) {``
      console.log(err);
      return
    }
    userInfo = result
    res.send({
      code: 200,
      message: '登录成功',
      data: userInfo,
    })
  })
})
module.exports = useRouter