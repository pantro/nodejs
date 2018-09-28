'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

//PETICIONES
api.get('/product', ProductCtrl.getProducts)
//Para acceder a un solo producto
api.get('/product/:productId', ProductCtrl.getProduct)
//Para subir nuevos productos
api.post('/product', ProductCtrl.saveProduct)
//Para actualizaciones
api.put('/product/:productId', ProductCtrl.updateProduct)
//Para eliminar
api.delete('/product/:productId', ProductCtrl.deleteProduct)

api.get('/private', auth, function (req, res) {
	res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api