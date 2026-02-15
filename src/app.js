const express = require('express');
const conncetDb = require('./config/database');
const connectDb = require('./config/database');
const app = express();
const User = require('./models/user');

app.post('/signup', async (req,res)=> {
    const user = new User({
        firstName: 'Preet',
        lastName: 'Singhwal',
        emailId: 'preet@gmail.com',
        password: 'test123',
        age: 22,
        gender: 'Male'
    });

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