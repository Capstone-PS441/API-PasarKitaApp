var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();

const Validator = require('fastest-validator');
const { authJwt } = require("../middleware");
const validator = new Validator()

const { Transactions } = require('../models');

/* GET Transactions listing. */
router.get('/', async (req, res, next) =>  {
    const transactions = await Transactions.findAll();
    return res.status(200).json(transactions);
});

router.get('/:id', async (req, res, next) =>  {
    const id = req.params.id;
    const transactions = await Transactions.findOne({where: {id:id}});
    return res.status(200).json(transactions || {});
});

router.post('/', async (req, res, next) =>  {
    const schema = { 
        name: 'string',
        price: 'integer',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    res.send('Success Post User');
    const Transactions = await Transactions.create(req.body);
    return res.status(201).json(Transactions);
  });

router.put('/:id', async (req, res, next) =>  {
    const id  = req.params.id; 

    let transactions = await Transactions.findOne({where: {id:id}});

    if(!transactions){
        return res.status(404).json({message: 'Transaction not found'});

    }

    const schema = { 
        name: 'string|optional',
        price: 'integer|optional',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    transactions = await Transactions.update(req.body)
    res.status(201).json(transactions)
});
  
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    let transactions = await Transactions.findOne({where: {id:id}});

    if(!Transactions){
        return res.status(404).json({message: 'Transaction not found'});

    }

    await transactions.destroy({where: {id:id}});
    res.status(200).json({
        message: 'Transaction is deleted'
    })

    res.send('Delete Transaction');
});

module.exports = router;
