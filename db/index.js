const mysql = require('mysql');
// 数据库连接设置
/**
 * 本地
 */
// let config = {
//     host: 'localhost',//数据库地址
//     port:'3306',
//     user: 'root',//用户名，没有可不填
//     password: '123456',//密码，没有可不填
//     database: 'sale'//数据库名称,
// }
/**
 * 线上
 */
let config = {
  connectionLimit: 200,
  acquireTimeout: 30000,
  host: '101.43.225.80',//数据库地址
  port: '3306',
  user: 'backstage',//用户名，没有可不填
  password: 'DCA5eXsANJCpkWfF',//密码，没有可不填
  database: 'backstage'//数据库名称 
}
/*
 * 创建连接池。
 */
const pool = mysql.createPool(config)
class sqlConnect {
  constructor() {
    this.pool = pool
  }
  query(sql, sqlArr = []) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          console.log(err)
        } else {
          conn.query(sql, sqlArr, function (error, result) {
            if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          })
          conn.release()
        }
      })
    })
  }
}
const sql = new sqlConnect()
module.exports = sql
