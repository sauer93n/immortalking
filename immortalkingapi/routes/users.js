var express = require('express');
var router = express.Router();

const {userModel} = require('../models/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users', (req, res, next) => {
  console.log(req.body);
})

module.exports = router;
