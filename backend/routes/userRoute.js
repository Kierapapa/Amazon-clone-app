/* esversion: 6 */

// load the things we need
const express = require("express");
const {getToken} = require("../util.js");
const User = require("../models/userModel.js");

// Single routing
const router = express.Router();

router.post('/signin', async (req, res, next) => {
    const signinUser = await User.findOne({
        email: req.body.email, 
        password: req.body.password
    })
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    } else {
        res.stautus(401).send({msg: 'Invalid email or password' })
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        const newUser = await user.save()
        console.log("A new user is adding");
        if(newUser) {
            res.send({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                isAdmin: false,
                token: getToken(newUser),
            })
        } else {
            res.stautus(401).send({msg: 'Invalid user data' })
        }
    } catch (error) {
        res.send({msg: error.message})
    }
})

router.get('/createadmin', async (req, res, next) => {
    try {
        const user = new User({
            name: 'kierapapa',
            email: 'kierapapa@abc.com',
            password: '1234',
            isAdmin: true
        })
        const newUser = await user.save()
        console.log("Admin Router Working");
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message})
    }
});

module.exports = router;