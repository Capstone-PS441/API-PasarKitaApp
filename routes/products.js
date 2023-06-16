var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const { authJwt } = require("../middleware");
const Validator = require('fastest-validator');

const validator = new Validator()

const {Products, Sellers} = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const products = await Products.findAll({include:{model: Sellers, as: "Seller"}});
    return res.status(200).send(products);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const product = await Products.findOne({where: {id:id}, include: [{model: Sellers, as: "Seller"}]});
    return res.status(201).json(product || {});
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
    // res.send('Success Post Product');
    const product = await Products.create(req.body);
    return res.status(201).json({product});
  });

router.put('/:id', async (req, res, next) => {
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
  
router.delete('/:id', async (req, res, next) =>  {
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


router.get('/category/:category', async (req, res, next) => {
    const category = req.params.category;
    const product = await Products.findOne({where: {category:category}});
    return res.status(200).json(product || {});
});

router.get('/seller/:id_seller', async (req, res, next) => {
    const id_seller = req.params.id_seller;
    const product = await Products.findOne({where: {id_toko:id_seller}});
    return res.status(200).json(product || {});
});

module.exports = router;
