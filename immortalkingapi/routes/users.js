var express = require('express');
var router = express.Router();

const {userModel} = require('../models/models');

/* GET users listing. */
router.get('/:email', function(req, res, next) {
  userModel.findOne({email: req.params.email}, function(err, user){
    if (err) return res.status(404).send('User with provided email not found :(');

    user.comparePasswords(req.body.password, function(err, isMatch){
      if (err) return res.status(500).send("Wrong password");

      if (isMatch) return res.status(200).send("Success");
    })
  })
});

router.post('/', (req, res, next) => {
  console.log(req.body);

  userModel.findOne({email: req.body.email}, function(err, user){
    if (user) return res.status(500).send('user with provided email already exist');

    // console.log(user);

    let newUser = new userModel({
      email: req.body.email,
      password: req.body.password,
    })
  
    newUser.save();
  })
})

module.exports = router;
