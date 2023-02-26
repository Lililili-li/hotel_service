const express = require('express')
const router = express.Router()
const handleDB = require('../db/handleDB')
// const db = require('../db/nodejs-orm')
router.get('/',async (req,res) => {
    const result = await handleDB(res,'goods_info','insert','数据库添加出错',{goods_name:'鲈鱼',goods_content:'不好吃还贵'})
    res.send({data:result,code:200,message:'添加成功'})
})
module.exports = router