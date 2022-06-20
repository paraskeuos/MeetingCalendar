const express = require('express');
const controller = require('./meetingsController');
const router = express.Router();

router.post('/add', controller.addMeeting);
router.delete('/', controller.deleteMeeting);
router.post('/', controller.getMeetings);

module.exports = router;