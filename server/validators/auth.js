const { check } = require('express-validator');


exports.userRegisterValidator=[
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('password').isLength({min:6}).not().isEmpty().withMessage('Password is required and 6 characters long.'),
]