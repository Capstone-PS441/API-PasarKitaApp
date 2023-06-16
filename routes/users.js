var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const { authJwt } = require("../middleware");
const Validator = require('fastest-validator');
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");
const validator = new Validator()

const {Users} = require('../models');


/* GET users listing. */
router.get('/',[
    authJwt.verifyToken
    ], async (req, res, next) => {
    const users = await Users.findAll();
    return res.json(users);
});

router.get('/:id',[
    authJwt.verifyToken
    ], async (req, res, next) => {
    const id = req.params.id;
    const users = await Users.findbByPk(id);
    return res.json(users || {});
});

router.post('/',[
    authJwt.verifyToken, 
        verifySignUp.checkDuplicateUsernameOrEmail 
    ], controller.signup);

router.put('/:id',[
    authJwt.verifyToken
    ], async (req, res, next) => {
    const id  = req.params.id;

    let users = await Users.findBy(id);

    if(!users){
        return res.json({message: 'User not found'});

    }

    const schema = { 
        name: 'string|optional',
        price: 'integer|optional',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    users = await Users.update(req.body)
    return res.status(201).json(users);
});
  
router.delete('/:id',[
    authJwt.verifyToken
    ], async (req, res, next) => {
    const id = req.params.id;

    let users = Users.findBy(id);

    if(!users){
        return res.status(404).json({message: 'User not found'});

    }

    users.destroy();
    res.status(200).json({
        message: 'User is deleted'
    })

    res.send('Delete User');
});

module.exports = router;
