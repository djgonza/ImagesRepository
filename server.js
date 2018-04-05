require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const routes = require('./routes');
const config = require('./config');

//Colores para la consola, mover
const colors = require('colors');
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

//Iniciamos express
const app = express();

//Creamos las carpetas necesarias
if (!fs.existsSync(config.staticContent)) {
	fs.mkdirSync(config.staticContent);
}

//Definimos los directorios estaticos
app.use(express.static(config.staticContent));

//Cors
app.use(cors());

//Configuraciones
app.use(express.json({limit: config.maxJsonFileAccept}));
app.use(bodyParser.json());

//Definimos las rutas
app.use(routes);

//Iniciamos el server
const port = process.env.PORT || 3000;
app.listen(port, () => {

	console.log('Server start in port: '.green, colors.green(port));

});