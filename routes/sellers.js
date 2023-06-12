var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const { authJwt } = require("../middleware");
const Validator = require('fastest-validator');

const validator = new Validator()

const {Sellers} = require('../models');

/* GET sellers listing. */
router.get('/', async (req, res, next) => {
    const sellers = await Sellers.findAll();
    return res.status(200).json(sellers);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const sellers = await Sellers.findOne({where: {id:id}});
    return res.status(200).json(sellers || {});
});

router.post('/', async (req, res, next) => {
    const schema = { 
        name: 'string',
        price: 'integer',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    res.send('Success Post User');
    const sellers = await Sellers.create(req.body);
    return res.status(201).json(sellers);
  });

router.put('/:id', async (req, res, next) => {
    const id  = req.params.id;

    let sellers = await Sellers.findOne({where: {id:id}});

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
    sellers = await Sellers.update(req.body)
    res.status(201).json(sellers)
});
  
router.delete('/:id', async (req, res, next) =>  {
    const id = req.params.id;

    let sellers =  Sellers.findOne({where: {id:id}});

    if(!sellers){
        return res.json({message: 'Seller not found'});

    }

    await Sellers.destroy({where: {id:id}});
    res.json({
        message: 'Seller is deleted'
    })

    res.send('Delete Seller');
});

module.exports = router;
