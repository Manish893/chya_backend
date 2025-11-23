const joi = require('joi');
const registerSchema = joi.object({
    name:joi.string().min(3).max(50).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({"string.pattern.base":"Passwrod must contain 8 characters,uppercase,lowercase,number and special character"}),

});
const loginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({"string.pattern.base":"Passwrod must contain 8 characters,uppercase,lowercase,number and special character"}),
})
const changePasswordSchema = joi.object({
     password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({"string.pattern.base":"Passwrod must contain 8 characters,uppercase,lowercase,number and special character"}),
})
module.exports = {registerSchema,loginSchema,changePasswordSchema}