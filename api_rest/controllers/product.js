'use strict'

const Product = require('../models/product')

function getProducts (req, res) {
	Product.find({}, (err, products) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
		if (!products) return res.status(404).send({ message: `No existen productos`})

		res.status(200).send({ products })//cuando la variable y el nombre se llaman iguales puede ir solo uno ({product})
	})
}

function getProduct ( req, res) {
	let productId = req.params.productId

	Product.findById( productId, (err, product) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}`})
		if (!product) return res.status(404).send({ message: `El producto no existe`})

		res.status(200).send({ product: product })//cuando la variable y el nombre se llaman iguales puede ir solo uno ({product})
	})
}

function saveProduct (req, res) {
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
}

function updateProduct (req, res) {
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate( productId, update, (err, productUpdated) => {
		if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${err}`})
		
		res.status(200).send({ product: productUpdated })
	})
}

function deleteProduct (req, res) {
	let productId = req.params.productId

	Product.findById( productId, (err, product) => {
		if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}`})
		if (!product) return res.status(404).send({ message: `El producto no existe`})

		Product.remove( err => {
			if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}`})
			res.status(200).send({ message: 'El producto ha sido eliminado' })
		})
	})
}

module.exports = {
	getProducts,
	getProduct,
	saveProduct,
	updateProduct,
	deleteProduct
}