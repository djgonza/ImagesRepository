const jwt = require('jsonwebtoken');
const config = require('config.json');

module.exports = generateToken;

function generateToken (req, res) {

	//Si no hay propiedad secret
	if (!req.body.hasOwnProperty('secret')) {
		res.sendStatus(401);
		return;
	}

	//Si el secret no corresponde a ningun directorio
	if (!config.directories.includes(req.body.secret)) {
		res.sendStatus(401);
		return;
	}

	//Enviamos el token
	var token = jwt.sign(req.body.secret, config.jwtCrypt);
	res.send({token: token});

}