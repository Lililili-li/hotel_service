const dbUtils = require('./handleDb/dbUtils.js')

// 数据库连接设置
/**
 * 本地
 */
let config = {
    host: 'localhost',//数据库地址
    port:'3306',
    user: 'root',//用户名，没有可不填
    password: '123456',//密码，没有可不填
    database: 'sale'//数据库名称,
}
/**
 * 线上
 */
// let config = {
//     host: '101.43.225.80',//数据库地址
//     port:'3306',
//     user: 'sale2',//用户名，没有可不填
//     password: '123456',//密码，没有可不填
//     database: 'sale2'//数据库名称,
// }
var pool = dbUtils.create(config);
var dbClient = new dbUtils.dbClient(pool);
module.exports = dbClient;