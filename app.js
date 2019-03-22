// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Inicializar variables
var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medidoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

//Conexion a la  Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Base de datos MONGO: \x1b[32m%s\x1b[0m', 'online');
});


//Server index config
/*
var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'));
app.use('/uploads', serveIndex(__dirname + '/uploads'));
*/

//Rutas
app.use('/img', imagenesRoutes);
app.use('/upload', uploadRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/medico', medidoRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);

//Esta ruta debe ser la ultima
app.use('/', appRoutes);


//escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});