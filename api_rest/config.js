module.exports = {
	port : process.env.PORT || 3001,
	db : process.env.MONGODB || 'mongodb://localhost:27017/shop',
	//Este codigo debe ser mas dificil de decifrar
	SECRET_TOKEN:'miclavedetokens'
}