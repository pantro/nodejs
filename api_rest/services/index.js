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

	jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken