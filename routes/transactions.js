var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();

const Validator = require('fastest-validator');

const validator = new Validator()

const {Transactions} = require('../models');

/* GET Transactions listing. */
router.get('/', function(req, res, next) {
    const transactions = Transactions.findAll();
    return res.json(Transactions);
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const transactions = Transactions.findbByPk(id);
    return res.json(transactions || {});
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
    const Transactions = Transactions.create(req.body);
    return res.json(Transactions);
  });

router.put('/:id', function(req, res, next) {
    const id  = req.params.id;

    let transactions = Transactions.findBy(id);

    if(!transactions){
        return res.json({message: 'Transaction not found'});

    }

    const schema = { 
        name: 'string|optional',
        price: 'integer|optional',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    transactions = Transactions.update(req.body)
});
  
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;

    let transactions = Transactions.findBy(id);

    if(!Transactions){
        return res.json({message: 'Transaction not found'});

    }

    transactions.destroy();
    res.json({
        message: 'Transaction is deleted'
    })

    res.send('Delete Transaction');
});

module.exports = router;
