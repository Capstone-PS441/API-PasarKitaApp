var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();

const Validator = require('fastest-validator');

const validator = new Validator()

const {Users} = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const users = Users.findAll();
    return res.json(users);
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const users = Products.findbByPk(id);
    return res.json(users || {});
});

router.post('/', function(req, res, next) {
    const schema = { 
        name: 'string',
        price: 'integer',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    res.send('Success Post User');
    const users = Users.create(req.body);
    return res.json(users);
  });

router.put('/:id', function(req, res, next) {
    const id  = req.params.id;

    let users = Users.findBy(id);

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
    users = Users.update(req.body)
});
  
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;

    let users = Users.findBy(id);

    if(!users){
        return res.json({message: 'User not found'});

    }

    users.destroy();
    res.json({
        message: 'User is deleted'
    })

    res.send('Delete User');
});

module.exports = router;
