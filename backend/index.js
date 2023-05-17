// Importacion del modulo express
const express = require('express');

// Referencia al plugin
const bodyParser = require('body-parser');

const cors = require('cors');

// Inicio de ejecucion
const app = express();
app.use(bodyParser());

app.use(cors({
    origin: '*'
}));

const userRoute = require("./src/route/users/user.route");
const themesRoute = require('./src/route/themes/theme.route');
const topicsRoute = require("./src/route/topics/topic.route");
const themesPropertiesRoute = require("./src/route/themes_properties/theme.properties.route");
 
//Ruta raiz o endpoint con el metodo GET
// Request -> solicitud -> parametros -> argumentos
// Response -> respuesta -> resultado
app.get('/', function (req, res) {
    //Logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller
    console.log("testando");
    res.json({application: 'Study APP', version: '1.0.0'});
});

//Llamadas a los routes de los UCs
userRoute(app);
themesRoute(app);
topicsRoute(app);
themesPropertiesRoute(app);


// Escuchar la peticion en el puerto 3000
app.listen(3000);