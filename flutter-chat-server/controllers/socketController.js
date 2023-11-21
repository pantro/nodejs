const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

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

const grabarMensaje = async( payload ) => {
  /**
   * payload = {
   *  de: '',
   *  para: '',
   *  mensaje: ''
   * }
   */
  
  try {
    const mensaje = new Mensaje( payload );
    mensaje.save(); // Guarda en base de datos

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
}