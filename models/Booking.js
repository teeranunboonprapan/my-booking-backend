const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    googleMapsLink: {
        type: String,
        required: false
    },
    photographerCount: {
        type: Number,
        required: true,
        min: 1
    },
    videographerNeeded: {
        type: Boolean,
        default: false
    },
    videographerCount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: false // ตั้งเป็น false ไปก่อน เผื่อข้อมูลเก่าไม่มี
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
