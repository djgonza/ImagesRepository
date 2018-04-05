const fs = require('fs');
const config = require('config.json');

module.exports = deleteImage;

function deleteImage (req, res) {
	
	if (!req.body.hasOwnProperty('name')) {
		res.sendStatus(500);
		return;
	}

	try {
		var path = config.staticContent + req.token + "/" + req.body.name;
		fs.unlinkSync(path);
		res.send("ok");
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

}