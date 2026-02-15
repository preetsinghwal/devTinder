const express = require('express');
const conncetDb = require('./config/database');
const connectDb = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());


// Get user API
app.get('/user', async (req,res)=> {
    try{
        // It will give only single record
        const user = await User.findOne({emailId: req.body.emailId});
        // It will all the matching result in array
        // const user = await User.find({emailId: req.body.emailId})
        res.send(user)
    }catch(err){
        res.status(404).send('Something went wrong')
    }
})

// Delete User API
app.delete('/user', async (req,res)=> {
    try{
        const userId = req.body.userId;
        await User.findByIdAndDelete(userId);
        res.send('User is successfully deleted');
    }catch(err) {
        res.status(404).send('Something went wrong');
    }
})

// Get Feed of all Users
app.get('/feed', async (req,res)=> {
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(404).send('Something went wrong');
    }
})

// Update user data by id
app.patch('/user', async (req,res)=> {
    const userId = req.body.userId;
    const body = req.body;
    try {
        await User.findByIdAndUpdate(userId, body);
        res.send('User updated successfully');
    }catch(err) {
        res.status(404).send('Something went wrong');
    }
})

app.post('/signup', async (req,res)=> {
    const user = new User(req.body);

    try{
        await user.save();
        res.send('User Added Successfully')
    }catch(err) {
        res.status(400).send('Error while saving the user please try after sometime:' + err.message)
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