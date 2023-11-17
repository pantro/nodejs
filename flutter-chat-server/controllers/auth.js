const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async ( req, res = response) => {
    
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();//Guarda en la base de datos

        // Generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario, 
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const login = async (req, res = response) => {
    try {
        
        const { email, password } = req.body;

        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales no coinciden'
            });
        }

        // Validar que es el mismo password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no coinciden reviselas nuevamente por favor'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el JWT
    const token = await generarJWT(uid);

    // Obtener el usuario d ela base de datos
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}