const Participant = require('./participantModel');

module.exports.getParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find({}).exec();
        res.status(200).json(participants);
    } catch(err) {
        next(err);
    }
};