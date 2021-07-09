const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
/**
 * Add a new Product
 */
router.post('/', (req, res) => {
    Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    }, (err, product) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(product);
    });
});

/**
 * Get all Products
 */
router.get('/', (req, res) => {
    Product.find({}).sort('name').exec((err, products) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(products);
    });
});

module.exports = router;
