/* esversion: 6 */

// load the things we need
const express = require("express");
const User = require("../models/userModel.js");

// Single routing
const router = express.Router();

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