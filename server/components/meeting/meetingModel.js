const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    participants: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant'
        }],
        required: true
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);