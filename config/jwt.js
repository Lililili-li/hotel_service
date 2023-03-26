const jwt = require('jsonwebtoken'); // 引入验证jsonwebtoken模块
const expressJWT  = require('express-jwt'); // 引入express-jwt模块

const jwtConfig = {
  CODE_ERROR: -1, // 请求响应失败code码
  CODE_SUCCESS: 0, // 请求响应成功code码
  CODE_TOKEN_EXPIRED: 401, // 授权失败
  PRIVATE_KEY: 'password', // 自定义jwt加密的私钥
  JWT_EXPIRED: 60, // 过期时间24小时
}
const jwtAuth = expressJWT({
  // 设置密钥
  secret: jwtConfig.PRIVATE_KEY,
  // 设置为true表示校验，false表示不校验
  credentialsRequired: true,
  // 自定义获取token的函数
  getToken: (req) => {
    if (req.headers.Authorization) {
      return req.headers.Authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
  // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
}).unless({
  path: [
    '/api/login',
  ]
})
// jwt-token解析
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, jwtConfig.PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode,
  jwtConfig
}