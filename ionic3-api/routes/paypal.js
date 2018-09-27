const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');

router.get('/products', (req, res, next) => {
    Shop.products((error, data) => {
        return res.json(data);
    })
});

router.get('/products/:id', (req, res, next) => {
    Shop.findById(req.params.id, (error, data) => {
        return res.json(data);
    })
});

router.post('/payment', (req, res, next) => {
    Shop.processPayment(req.body.total, req.body.paypal_response, req.body.cart, (error, data) => {
        if(error) {
            return res.json(error);
        }
        return res.json(data);
    })
});

router.get('/orders', (req, res, next) => {
    Shop.orders((error, data) => {
        if(data) {
            let response = [];
            for(let i = 0; i < data.length; i++) {
                let products = data[i].products.split(',');
                let productsData = [];
                for(let j = 0; j < products.length; j++) {
                    let properties = products[j].split('*');
                    productsData.push({
                        name: properties[0],
                        price: properties[1],
                        picture: properties[2],
                        qty: properties[3]
                    })
                }
                response.push({
                    paypal_transaction: data[i].paypal_transaction,
                    total: data[i].total,
                    status: data[i].status,
                    products: productsData
                });
            }
            res.json(response);
        }
    })
});

module.exports = router;