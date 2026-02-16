const express = require('express');
const connectDb = require('./config/database');
const app = express();
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const {userAuth} = require('../middlewares/auth');

app.use(express.json());
app.use(cookieParser())


app.post('/signup', async (req,res)=> {

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

app.post('/login', async (req,res)=> {
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

app.get('/profile', userAuth, async (req,res)=> {
    try {
        const user = req?.user;
        res.send(user);
        
    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

app.post('/sendConnectionRequest', userAuth, async (req, res)=> {
    try{
        const user = req?.user;
        res.send(user?.firstName + ' sent connection request');

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

connectDb().then(() => {
    console.log('Database connected successfully');
    app.listen('3000', () => {
        console.log('Server is running')
    })
}).catch(err => {
    console.log('Error while connecting to database')
})