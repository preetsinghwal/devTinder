const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('../middlewares/auth')

app.use('/admin', adminAuth);
// app.use('/user', userAuth);

app.post('/user/login', (req,res)=> {
    res.send('User loggedin successfully')
})

app.get('/admin/data', (req,res)=> {
    res.send('Admin data received')
})

app.get('/user/profile', userAuth, (req,res)=> {
    res.send('User profile data received')
})

app.use('/hello', (req,res, next)=> {
    // next();
    // res.send('Response')
    next()
},
[(req,res,next)=> {
    next()
    res.send("2nd response")
    
}]
)

app.get('/getUserData', (req,res)=> {
    throw new Error();
})

app.use('/', (err, req,res, next)=> {
    if(err) {
        res.status(500).send('Something went wrong')
    }
})

app.listen('3000', ()=> {
    console.log('Server is running')
})