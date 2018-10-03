'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

//PETICIONES
api.get('/product', ProductCtrl.getProducts)
//Para acceder a un solo producto
api.get('/product/:productId', ProductCtrl.getProduct)
//Para subir nuevos productos
api.post('/product',auth, ProductCtrl.saveProduct)
//Para actualizaciones
api.put('/product/:productId',auth, ProductCtrl.updateProduct)
//Para eliminar
api.delete('/product/:productId',auth, ProductCtrl.deleteProduct)

//Login
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/private', auth, function (req, res) {
	res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api