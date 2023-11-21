const { response } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {
  
  const desde = Number( req.query.desde ) || 0; // Para paginar los usuarios en el url se agrega '/api/usuarios?desde=0'

  const usuarios = await Usuario// .find() devuelve todos los usuarios conectados
  .find({_id: { $ne: req.uid }})// ($ne: es negacion) Va a devolver todos menos el que tiene ese UID
  .sort('-online')// Ordena primero lo conectados
  .skip(desde) // Para paginar le envia que desde este numero en adelante tienen que mandarles los registros
  .limit(20); // Para el paginador solo enviara 2 registros que sigan al numero anterior "desde", asi evitamos enviar mucha cantidad de datos de respuesta.

  res.json({
    ok: true,
    usuarios,
    uid: req.uid
  });
}

module.exports = {
  getUsuarios
}