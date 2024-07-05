const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/book', auth, async (req, res) => {
  const { date, slot } = req.body;

  try {
    const booking = new Booking({ user: req.user.id, date, slot });
    await booking.save();
    res.status(201).send('Booking created');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/view', auth, async (req, res) => {
  console.log(req.body,req.user,'userrrrr');
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('user', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;