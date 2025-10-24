const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET: ดึงข้อมูลการจองทั้งหมด
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 'asc' });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: สร้างการจองใหม่
router.post('/', async (req, res) => {
    const booking = new Booking({
        date: req.body.date,
        name: req.body.name,
        address: req.body.address,
        duration: req.body.duration,
        googleMapsLink: req.body.googleMapsLink,
        photographerCount: req.body.photographerCount,
        videographerNeeded: req.body.videographerNeeded,
        videographerCount: req.body.videographerCount,
        price: req.body.price
    });

    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: อัปเดตข้อมูลการจอง
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // คืนค่า document ที่อัปเดตแล้ว
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลการจอง' });
        }
        res.json(updatedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: ลบข้อมูลการจอง
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลการจอง' });
        }
        res.json({ message: 'ลบข้อมูลการจองสำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
