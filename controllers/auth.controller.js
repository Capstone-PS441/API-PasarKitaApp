const {Users} = require('../models');
const config = require("../config/auth.config");

// const Op = Users.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const generateRandomNumber= (digits) => {
//   const min = Math.pow(10, digits - 1); // Minimum value based on number of digits
//   const max = Math.pow(10, digits) - 1; // Maximum value based on number of digits

//   const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

//   return randomNumber;
// }
exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
          res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.username }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};