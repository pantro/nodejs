const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  
  const errores = validationResult(req);
  
  if (!errores.isEmpty()) {

      let msg = Object.values(errores.mapped())[0]['msg']

      return res.status(400).json({
          ok: false,
          msg: msg
      })
  }

  next();
}

module.exports = {
  validarCampos
}