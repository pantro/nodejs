'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	displayName: String,
	avatar: String,
	password: { type: String, select:false},//se pone false para que no se envie al usuario cuando realiza peticiones
	signupDate: { type: Date, default: Date.now()},
	lastLogin: Date
})

/*
*Mongoose nos brinda funciones que podemos utilizar antes o despues de guardar los datos
*/
UserSchema.pre('save', function (next) {
	let user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)

			user.password = hash
			next()
		})
	})
})
//Utilizamos un metodo gravatar para poder obtener el avatar del correo
UserSchema.methods.gravatar = function () {
	if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)