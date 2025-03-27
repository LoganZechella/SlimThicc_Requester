const express = require('express');
const songController = require('../controllers/songController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post('/', validateRequest, songController.createSongRequest);

module.exports = router; 