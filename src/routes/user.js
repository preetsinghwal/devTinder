const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();


userRouter.get('/user/request/received', userAuth, async (req,res)=> {
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate(
            "fromUserId",
            ['firstName', 'lastName', 'photoUrl', 'age', 'gender', 'about', 'skills']
        )

        res.status(200).json({
            message: 'Data Fetched Successfully',
            data: connectionRequests
        })
    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
})

module.exports = userRouter;