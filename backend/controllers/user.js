const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = ( req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.status(201).json({
          message: 'user created!',
          result: result
        });
      }).catch(error => {
        res.status(500).json({
          message: 'This email already exists'
        });

      });
    })
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email }).then
  ( user => {

    if (!user) {
      return res.status(401).json({
        message: 'auth faild3'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
    .then(result => {
      if (!result) {

        return res.status(401).json({
          message: 'auth faild2'
        });
      }
      /// here is where we have valid password and same EMAIL
      const token = jwt.sign({
          email: fetchedUser.email, userId: fetchedUser._id},
        'secret_this_be_longer',
        {expiresIn: '1h'},

      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        username: fetchedUser.email
      });

    }).catch(err => {
    console.log(err);
    return res.status(401).json({
      message: 'Invalid authentication'
    });
  });
}
