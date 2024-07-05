const express = require('express');
const Availability = require('../models/Availability');
const auth = require('../middleware/auth');

const router = express.Router();


const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
};


router.post('/add', auth, adminAuth, async (req, res) => {
    const { date, startHour } = req.body;

    try {
        const availability = new Availability({
            admin: req.user.id,
            date,
            startHour,
            endHour: startHour + 1,
        });

        await availability.save();
        res.status(201).send('Availability slot added');
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/view', auth, async (req, res) => {
    console.log(req.body,req.user,'userrrrr');
    try {
      const bookings = await Availability.find()
      console.log(bookings,'bookings');
      res.json(bookings);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// request.get('/view1',auth,async(req,res)=>{

// })

module.exports = router;  
