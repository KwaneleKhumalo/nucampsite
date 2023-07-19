var express = require('express');
const User = require('../models/user')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        const err = new Error(`User ${req.body.username} already exists!`)
        err.status = 403
        return next(err)
      } else {
        User.create({
          username: req.body.username,
          password: req.body.password
        })
          .then(user => {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.json({ status: "Registration Successful!", user: user })
          })
          .catch(err => next(err))
      }
    })
    .catch(err => next(err))
})

router.post('/login', function (req, res, next) {
  
})

module.exports = router;
