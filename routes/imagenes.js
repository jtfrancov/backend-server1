var express = require('express');
var fs = require('fs');

var app = express();

//Rutas
app.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;


    var path = `./uploads/${ tipo }/${ img }`;
    var pathAbsoluto = `./uploads/${ tipo }/`;
    //res.status(404).sendFile(pathAbsoluto); 

    if (!fs.existsSync(path)) {
        pathAbsoluto = './assets/';
        img = 'no-img.jpg';
    }
    /*
        res.status(200).json({
            ok: true,
            mensaje: 'se envio la imagen correctamente',
            pathAbsoluto: pathAbsoluto,
            img: img

        });
    */

    var options = {
        //root: __dirname + '/uploads/medicos/',
        root: pathAbsoluto,
        dotfiles: 'allow',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    //res.sendfile(path);
    res.sendFile(img, options, function(err) {
        if (err) {
            //next(err);
            if (err) {
                console.log('Error al enviar archivo:', img);
                /*return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando hospitales',
                    errors: err
                });*/
            }

        } else {
            console.log('Enviando archivo nombre:', img);
            /*return res.status(200).json({
                ok: true,
                mensaje: 'se envio la imagen correctamente'
            });*/

        }
    });

    /*
        fs.exists(path, (existe) => {

            if (!existe) {
                pathAbsoluto: './assets/';
                img = 'no-img.jpg';
            }

        });
        */
    /*
        res.status(200).json({
            ok: true,
            mensaje: 'Peticion realizada correctamente'
        });
    */
});

module.exports = app;