const express = require('express');
const controller = require('./participantsController');
const router = express.Router();

router.get('/', controller.getParticipants);

module.exports = router;