var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const { verifySignUp } = require("../middleware");
const Validator = require('fastest-validator');
const controller = require("../controllers/auth.controller");
const validator = new Validator()

// const {Users} = require('../models');

router.post('/signup',[
    verifySignUp.checkDuplicateUsernameOrEmail
    ], controller.signup
);

router.post('/signin', controller.signin);

module.exports = router;