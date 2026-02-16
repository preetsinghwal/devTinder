const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {validateSignupData} = require('../utils/validation');

authRouter.post('/signup', async (req,res)=> {

    try{

        // Validate the request
        validateSignupData(req)

        // Encryt the pass

        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });


        await user.save();
        res.send('User Added Successfully')
    }catch(err) {
        res.status(400).send('Error: ' + err.message)
    }

})

authRouter.post('/login', async (req,res)=> {
    try {
        const {emailId, password} = req?.body;

        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error('Invalid Email Id or Password')
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {
            const token = await user.getJwt();

            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
            res.send('Login Successfully');
        } else {
            throw new Error('Invalid Email Id or Password')
        }

    }catch(err) {
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = authRouter;