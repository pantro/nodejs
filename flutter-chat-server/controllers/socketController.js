const Usuario = require('../models/usuario');

const usuarioConectado = async ( uid = "") => {
  const usuario = await Usuario.findById( uid );
  console.log('usuario autenticado');
  usuario.online = true;

  await usuario.save(); // alamacenando en la base de datos

  return usuario;

}

const usuarioDesconectado = async ( uid = '') => {
  const usuario = await Usuario.findById( uid );
  usuario.online = false;

  await usuario.save(); // alamacenando en la base de datos

  return usuario;

}

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
}