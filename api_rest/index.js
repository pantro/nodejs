'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//EJemplos
app.get('/hola', (req, res) => {
	res.send({ message: 'Hola Mundo!'})
})
//Con parametros
app.get('/hola/:name', (req, res) => {
	res.send({ message: `Hola ${req.params.name}!`})
})
//--- fin ejemplo

app.get('/api/product', (req, res) =>{
	res.send(200, {products: []})
})
//Para acceder a un solo producto
app.get('/api/product/:productId', (req, res) =>{
	
})
//Para subir nuevos productos
app.post('/api/product', (req, res) =>{
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category//Solo recibe categorias definidas
	product.description = req.body.description

	//Guardar en mongodb
	product.save((err, productStored) => {
		if (err) res.status(500).send({ message: `Error al salvar los datos: ${err}`})

		res.status(200).send({product: productStored})
	})
})
//Para actualizaciones
app.put('/api/product/:productId', (req, res) =>{
	
})
//Eliminar
app.delete('/api/product/:productId', (req, res) =>{
	
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res)=> {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')

	app.listen(port, () => {
		console.log(`API REST corriendo puerto: ${port}`)
	})
})


