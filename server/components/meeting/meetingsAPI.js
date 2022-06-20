const express = require('express');
const controller = require('./meetingsController');
const router = express.Router();

router.post('/', controller.addMeeting);
router.delete('/', controller.deleteMeeting);
router.get('/', controller.getMeetings);

module.exports = router;