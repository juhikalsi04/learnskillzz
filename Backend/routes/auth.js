const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'secret';

router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email format')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();

        // Create JWT token
        const payload = {
            user: {
                id: savedUser.id
            }
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ message: "User created successfully", authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//authenticate user request:POST /api/discussion/auth/login
router.post('/login', [
    body('password', "this field is mandatory").exists(),
    body('email', "enter valid email").isEmail()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Received login request:', { email, password }); // Debugging line

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email); // Debugging line
            return res.status(400).send("email not found");
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {

            console.log('Incorrect password for user:', email); // Debugging line
            return res.status(400).send("password doesn't match");
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        success = true
        const authtoken = jwt.sign(payload, JWT_SECRET);
        console.log('User logged in successfully:', email); // Debugging line
        res.json({ success, authtoken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send("some error occurred");
    }
});


// get user info POST: /api/auth/getuser
router.post('/getuser', fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        res.status(500).send("some error occured")
    }
})

router.get('/:userId', fetchUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router