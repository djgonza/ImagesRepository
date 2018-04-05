const fs = require('fs');
const randomstring = require('randomstring');
const config = require('config.json');
const acceptsContentTypes = ['image/jpeg', 'image/tiff', 'image/gif', 'image/png'];

module.exports = updloadImage;

/* Functions */

function updloadImage (req, res) {

	//Validamos el fichero
	if (!acceptsContentTypes.includes(req.headers['content-type'])) {
		res.sendStatus(500);
		return;
	}

	//Validamos el tamaño del archivo
	if (req.headers['content-length'] > config.maxSizeFile) {
		res.sendStatus(500);
		return;
	} 

	//Comprobamos que el directorio existe, sino lo creamos
	var dir = config.staticContent + req.token + "/";
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	//Creamos un nombre para la imagen
	var path = null;
	var extension = getExtension(req.headers['content-type']);
	while (!path) {
		path = dir + randomstring.generate() + extension;
		if (fs.existsSync(path)) {
			path = null;
		}
	}

	//Guardamos la imagen
	req.pipe(fs.createWriteStream(path));

	//Enviamos la ruta
	req.on('end', () => {
		res.send({
			path: path
		});
	});

	//Req Error
	req.on('error', (err) => {
		console.log(err);
		res.sendStatus(500);
	});

}

function getExtension (contentType) {
	
	switch (contentType) {
		case 'image/jpeg':
		return '.jpg';
		case 'image/tiff':
		return '.tiff';
		case 'image/gif':
		return '.git';
		case 'image/png':
		return '.png';
	}

}

