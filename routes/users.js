const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//get the seacret from the .env file
const jwtSecret = process.env.JWT_SECRET


/*
@route  POST users/signup
@desc   Register a user
@access public
*/
router.post('/signup', (req, res) => {
    const { email, password } = req.body

    //Simple validation
    if (!email || !password) {
        return res.status(400).json({ 'success': false, 'msg': 'Please enter all feilds' })
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ 'success': false, 'msg': 'User already exists' })
        })


    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (e, hash) => {
            if (e) return res.status(402).json({ 'success': false, 'msg': e })
            const password = hash
            const newUser = new User({ email, password })
            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user._id },
                        jwtSecret,
                        // { expiresIn: 36000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token,
                                user: {
                                    id: user.id,
                                    email: user.email,
                                }
                            })
                        }
                    )
                })
        })
    })
})




/*
@route  POST users/login
@desc   User log in
@access public
*/
router.post('/login', (req, res) => {
    const { email, password } = req.body

    //Simple validation
    if (!email || !password) {
        return res.status(400).json({ 'success': false, 'msg': 'Please enter all feilds' })
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ 'success': false, 'msg': 'User not found' })


            //Creat esalt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({ 'success': false, 'msg': 'Invalid credentials' })

                        jwt.sign(
                            { id: user._id },
                            jwtSecret,
                            // { expiresIn: 36000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    }
                                })
                            }
                        )

                    })
            })
        })

})


module.exports = router;