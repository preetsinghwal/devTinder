const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData} = require('../utils/validation');

profileRouter.get('/profile/view', userAuth, async (req,res)=> {
    try {
        const user = req?.user;
        res.send(user);
        
    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

profileRouter.patch('/profile/edit', userAuth,  async (req,res)=> {
    try{
        if(!validateEditProfileData(req)) {
            throw new Error('Invalid Edit Request');
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((item)=> (loggedInUser[item] = req.body[item]))

        await loggedInUser.save();
        
        res.status(200).send({message: `${loggedInUser.firstName}, your profile update successfully`, data: loggedInUser});
    }catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = profileRouter;