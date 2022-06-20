const mongoose = require('mongoose');
const Meeting = require('./meetingModel');
const Participant = require('../participant/participantModel');

module.exports.addMeeting = async (req, res, next) => {
    try {
        const participants = [];
        req.body.participants.array.forEach(participantName => {
            const participant = Participant.find({ name: participantName });
            participants.push(participant);
        });

        const meetingObj = new Meeting({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            time: req.body.time,
            participants
        });

        res.status(201).json({ msg: 'Meeting added' });
    } catch(err) {
        next(err);
    }
};

module.exports.deleteMeeting = async (req, res, next) => {
    // TODO
};

module.exports.getMeetings = async (req, res, next) => {
    // TODO
};