const express = require('express')
const router = express.Router()
const dbClient = require('../db/index')
router.get('/', async (req, res) => {
  dbClient.list('product', function(err, result){
    console.log(result);
    res.send(result)
  })
})
module.exports = router