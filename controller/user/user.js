const dbClient = require('../../db/index')
const md5 = require('../../utils/md5')
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config/jwt');
let login = (req,res) => {
  let userInfo = {}
  let { username, password } = req.query;
  // 注册时使用
  // password = md5(password);
  dbClient.select('b_user', { 'username': `${username}`, 'password': `${password}` }, function (err, result) {
    if (err) {
      console.log(err)
      return
    }
    userInfo = result
    const token = jwt.sign({ userInfo: result }, jwtConfig.PRIVATE_KEY, { expiresIn: jwtConfig.CODE_TOKEN_EXPIRED })
    userInfo.token = token
    res.send({
      code: 200,
      message: '登录成功',
      data: userInfo,
    })
  })
}
module.exports = {
  login
}