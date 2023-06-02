var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();

const Validator = require('fastest-validator');

const validator = new Validator()

const {Sellers} = require('../models');

/* GET sellers listing. */
router.get('/', function(req, res, next) {
    const sellers = Sellers.findAll();
    return res.json(sellers);
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const sellers = Sellers.findbByPk(id);
    return res.json(sellers || {});
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
    const sellers = Sellers.create(req.body);
    return res.json(sellers);
  });

router.put('/:id', function(req, res, next) {
    const id  = req.params.id;

    let sellers = Sellers.findBy(id);

    if(!sellers){
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
    sellers = Sellers.update(req.body)
});
  
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;

    let sellers = Sellers.findBy(id);

    if(!sellers){
        return res.json({message: 'User not found'});

    }

    sellers.destroy();
    res.json({
        message: 'User is deleted'
    })

    res.send('Delete User');
});

module.exports = router;
