const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body, 'req.body');
    const { name, email, password, role, course } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === 'admin') {
            user = new Admin({ name, email, password: hashedPassword });
        } else {
            user = new Student({ name, email, password: hashedPassword, course });
        }

        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body, 'req.body');
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'admin') {
            user = await Admin.findOne({ email });
        } else {
            user = await Student.findOne({ email });
        }

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;