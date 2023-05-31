var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();

const Validator = require('fastest-validator');

const validator = new Validator()

const {Product} = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const products = Product.findAll();
    return res.json(products);
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const product = Product.findbByPk(id);
    return res.json(product || {});
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
    res.send('Success Post Product');
    const product = Product.create(req.body);
    return res.json(product);
  });

router.put('/:id', function(req, res, next) {
    const id  = req.params.id;

    let product = Product.findBy(id);

    if(!product){
        return res.json({message: 'Product not found'});

    }

    const schema = { 
        name: 'string|optional',
        price: 'integer|optional',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    product = Product.update(req.body)

    res.send('ok')

    res.send('put product');
});
  
router.delete('/:id', function(req, res, next) {
    const id = req.params.id;

    let product = Product.findBy(id);

    if(!product){
        return res.json({message: 'Product not found'});

    }

    product.destroy();
    res.json({
        message: 'Product is deleted'
    })

    res.send('delete product');
});

module.exports = router;
