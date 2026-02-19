const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req?.body;

    if(!firstName || !lastName) {
        throw new Error('Name is not valid');
    } else if (!validator.isEmail(emailId)) {
        throw new Error('EmailId is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Please Enter strong password');
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ['firstName', 'lastName', 'gender', 'age', 'about', 'photoUrl', 'skills'];
    const isEditAllowed = Object.keys(req.body).every((field)=> {
        return allowedEditFields.includes(field)
    })

    return isEditAllowed;
}

module.exports = {
    validateSignupData,
    validateEditProfileData
}