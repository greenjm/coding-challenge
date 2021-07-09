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

/**
 * Get Product by Name
 */
router.get('/find', (req, res) => {
    const name = req.query.name;
    Product.find({ name }, (err, product) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(product);
    });
});

/**
 * Update a Product
 */
router.patch('/', (req, res) => {
    Product.updateOne({
        name: req.body.name
    }, {
        description: req.body.description,
        price: req.body.price,
    }, (err, updateRes) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (updateRes.nModified < 1) {
            return res.status(400).json({ message: 'Product not found' });
        }
        return res.json(updateRes.nModified);
    });
});

/**
 * Delete a Product
 */
router.delete('/', (req, res) => {
    const name = req.query.name;
    Product.deleteOne({ name }, (err, deleteRes) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!deleteRes.ok || deleteRes.deletedCount < 1) {
            return res.status(400).json({ message: 'Product not deleted' });
        }
        return res.json(deleteRes.deletedCount);
    });
});

module.exports = router;
