const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load Input Validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

// Load config
const keys = require('../config/keys');

// Load Model
const User = require('../models/User');

module.exports.registerUser = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User
        .findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) { throw err }
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
}

module.exports.loginUser = (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(404).json(errors)
    }

    const {email, password} = req.body;

    // Find user by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Create JWT Payload
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }

                        // Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            { expiresIn: 3600 }, 
                            (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
                        })
                    }
                    else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors)
                    }
                })
        })
}

module.exports.getCurrentUser = (req, res) => {
    res.json(req.user)
}