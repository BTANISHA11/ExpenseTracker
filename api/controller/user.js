const User = require('../models/User.js');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: false, msg: result.errors[0].msg });
        }

        const { email, password, fullName } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, msg: 'Email is already registered.' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with hashed password
        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
        });

        const data = { user: { id: newUser.id } };
        const token = JWT.sign(data, secretKey, { expiresIn: '3d' });
        res.cookie('token', token, { withCredentials: true, httpOnly: true });

        return res.status(201).json({ status: true, msg: 'Account created successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ status: false, msg: error.errors[0].msg });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, msg: 'Email not found.' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, msg: 'Invalid password.' });
        }

        // Generate JWT token
        const data = { user: { id: user.id } };
        const token = JWT.sign(data, secretKey, { expiresIn: '3d' });
        res.cookie('token', token, { withCredentials: true, httpOnly: true });

        return res.status(200).json({ status: true, msg: 'Login successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};
