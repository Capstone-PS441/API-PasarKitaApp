var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const { authJwt } = require("../middleware");
const Validator = require('fastest-validator');

const validator = new Validator()

const {Products} = require('../models');

/* GET users listing. */
router.get('/', [
    authJwt.verifyToken
    ], async (req, res, next) => {
    const products = await Products.findAll();
    return res.status(200).send({body: products});
});

router.get('/:id', [
    authJwt.verifyToken
    ], async (req, res, next) => {
    const id = req.params.id;
    const product = await Products.findOne({where: {id:id}});
    return res.status(201).json(product || {});
});

router.post('/', [
    authJwt.verifyToken
    ], async (req, res, next) => {
    const schema = { 
        name: 'string',
        price: 'integer',
    }

    const validate = validator.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    }
    // res.send('Success Post Product');
    const product = await Products.create(req.body);
    return res.status(201).json({product});
  });

router.put('/:id',[
    authJwt.verifyToken
    ], async (req, res, next) => {
    const id  = req.params.id;

    let product = await Products.findBy(id);

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
    product = await Products.update(req.body)

    res.status(201).json(product)
});
  
router.delete('/:id',[
    authJwt.verifyToken
    ], async (req, res, next) =>  {
    const id = req.params.id;

    let product = await Products.findOne({where: {id:id}});

    if(!product){
        return res.json({message: 'Product not found'});

    }

    await product.destroy({
        where: {id:id},
    });
    res.json({
        message: 'Product is deleted'
    })

    res.send('delete product');
});

module.exports = router;
