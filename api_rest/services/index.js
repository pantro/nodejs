'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
	const payload = {
		/*Esto no es seguro ya que estamos poniendo en peligro la base de datos, 
		tenemos que crear otro que sea distinto al de la base de datos*/
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	}
	
	return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
	const decoded = new Promise((resolve, reject) => {
		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if (payload.exp <= moment().unix()) {
				resolve ({
					status: 401,
					message: 'El token ha expirado'
				})
			}

			resolve(payload.sub)

		} catch (err) {
			reject ({
				status: 500,
				message: 'Token invalido'
			})
		}
	})

	return decoded
}

module.exports = {
	createToken,
	decodeToken
}