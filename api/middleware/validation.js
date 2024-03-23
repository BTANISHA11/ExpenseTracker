const { body } = require('express-validator');

// Define custom validation function for full name
const isValidFullName = (value) => {
    return /^[a-zA-Z ]+$/.test(value); // Only allow alphabets and spaces
};

// Define validation rules for phone and full name
exports.validateSignup = [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password should contain at least 8 characters'),
    body('fullName')
        .isLength({ min: 3 }).withMessage('Full name should contain at least 3 characters')
        .custom(isValidFullName).withMessage('Full name should only contain alphabets and spaces')
];

exports.validateLogin = [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password should contain at least 8 characters')
];
