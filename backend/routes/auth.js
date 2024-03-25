const express = require("express");
const router = express.Router();
const User = require('../models/userModel')
const { validationResult, body } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

// ROUTE 1: Create new User using: POST "api/auth/signup". No login required
router.post("/signup", [// validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is too short').isLength({ min: 8 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });

    }
    let success = false;
    try {
        //Check if email already exist or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Email already exist" })
        }

        //Encrypting password and adding salt to password        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creating new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        //Creating a data object with user id
        const data = {
            user: {
                id: user.id
            }
        }
        //Creating JWT token and returning res.json
        jwt.sign(data, JWT_SECRET_TOKEN, function (err, token) {
            if (err) {
                console.error(err.message);
            } else {
                success = true;
                res.json({ success, token });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured")
    }
});

// ROUTE 2: Authenticate a User using: POST "api/auth/login". No login required
router.post("/login", [// validator
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cammot be blank').exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    let success = false;
    // Assigning email, password
    const { email, password } = req.body;
    try {
        // Find email
        let user = await User.findOne({ email });
        // Check if user already exist or not
        if (!user) {
            return res.status(400).json({ success, error: "Wrong credentials" });
        }

        // Compare password with its hash
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            res.status(400).json({ success, error: "Wrong credentials" });
        }

        // Creating a data object with user id
        const payload = {
            user: {
                id: user.id
            }
        }

        // Create JWT token and
        jwt.sign(payload, JWT_SECRET_TOKEN, function (err, token) {
            if (err) {
                console.error(err.message);
            } else {
                success = true;
                res.json({ success, token });
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }

});

// ROUTE 3: Get loggedin User details: POST "api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.userId;// Access the user ID from fetchuser()
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
        // return next(new AppError(`Something went wrong ${error}`, 500));
    }
})

module.exports = router;