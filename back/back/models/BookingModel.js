const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['Booked'],
        default: 'Booked'
    },
    

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
