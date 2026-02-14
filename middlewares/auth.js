const adminAuth = (req,res, next)=> {
    console.log("Admin auth middleware is running");
    const token = "xyz";
    const isAdminAuthorized = token === 'xyfdfdfdz';

    if(!isAdminAuthorized) {
        res.status(401).send('Unauthorized Admin');
    } else {
        next();
    }
}

const userAuth = (req,res, next)=> {
    console.log("User auth middleware is running");
    const token = "xyz";
    const isUserAuthorized = token === 'xyz';

    if(!isUserAuthorized) {
        res.status(401).send('Unauthorized user');
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}