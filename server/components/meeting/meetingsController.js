const mongoose = require('mongoose');
const Meeting = require('./meetingModel');
const Participant = require('../participant/participantModel');

module.exports.addMeeting = async (req, res, next) => {
    try {
        const participants = [];
        req.body.participants.array.forEach(participantName => {
            const participant = 
                await Participant.findOne({ name: participantName }).exec();
            participants.push(participant);
        });

        const meetingObj = new Meeting({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            time: req.body.time,
            participants
        });

        res.status(201).json({ msg: 'Meeting added.' });
    } catch(err) {
        next(err);
    }
};

module.exports.deleteMeeting = async (req, res, next) => {
    try {
        await Meeting.deleteOne({ _id: req.body.id }).exec();
        res.status(200).json({ msg: 'Meeting deleted.' });
    } catch(err) {
        next(err);
    }
};

module.exports.getMeetings = async (req, res, next) => {
    const month = req.body.month;
    const year = req.body.year;
    
    try {
        const meetings = await Meeting
            .find({ $and: [{ month: month }, { year: year }]})
            .sort({ month: 'asc'})
            .exec();

        res.status(200).json(meetings);

    } catch(err) {
        next(err);
    }
};