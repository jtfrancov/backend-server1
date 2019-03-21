var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

// =====================================================
// Obtener todos los usuarios
// =====================================================
app.post('/', (req, res, next) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {

        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuarioBD) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Credenciales incorrectas - email',
                errors: { message: 'No existe un usuario con el email' }
            });
        }

        //verificamos la contraseña
        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Credenciales incorrectas - password',
                errors: { message: 'No existe un usuario con el password' }
            });
        }

        //Creamos un token (14400 seg = 4 horas)
        usuarioBD.password = ':)';
        var token = jwt.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 });


        //si llegamos aqui -> todo ok
        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id: usuarioBD._id
        });
    })



});

module.exports = app;