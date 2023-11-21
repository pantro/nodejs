const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {

  const miId = req.uid;
  const mensajesDe = req.params.de;
  console.log('miId: ', miId);
  console.log('mensajesDe: ', mensajesDe);
  const last30 = await Mensaje.find({
    $or: [{ de: miId, para: mensajesDe}, { de: mensajesDe, para: miId }]
  })
  .sort({ createdAt : 'desc'})
  .limit(30);

  res.json({
    ok: true,
    msg: last30,
  })
}

module.exports = {
  obtenerChat
}