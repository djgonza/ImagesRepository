const fs = require('fs');
const config = require('config.json');

module.exports = listImages;

function listImages (req, res) {

	try {
		var path = config.staticContent + req.token;
		var files = fs.readdirSync(path);
		res.send(files);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

}