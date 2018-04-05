const express = require('express');
const router = express.Router();

const jwtProtected = require('utilities/jwtProtected');

/* Token */
router.post('/getToken', require('./generateToken'));

/* Images */
router.get('/images', jwtProtected, require('./listImages'));
router.post('/images', jwtProtected, require('./saveImage'));
router.delete('/images', jwtProtected, require('./deleteImage'));

module.exports = router;