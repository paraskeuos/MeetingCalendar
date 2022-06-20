const mongoose = require('mongoose');
const Meeting = require('./meetingModel');
const Participant = require('../participant/participantModel');

module.exports.addMeeting = async (req, res, next) => {
    try {
        const partNameObjs = JSON.parse(req.body.participants)
            .map(name => ({ name }));
        const participants = await Participant
            .find({ $or: partNameObjs }).exec();

        const meetingObj = new Meeting({
            _id: new mongoose.Types.ObjectId(),
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            name: req.body.name,
            description: req.body.description,
            time: req.body.time,
            participants
        });

        await meetingObj.save();

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
    try {
        const meetings = await Meeting
            .find({ $and: [{ month: req.body.month }, { year: req.body.year }]})
            .sort({ day: 'asc'})
            .populate('participants')
            .exec();
        
        res.status(200).json(meetings);

    } catch(err) {
        next(err);
    }
};