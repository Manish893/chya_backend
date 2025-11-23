const jwt = require('jsonwebtoken');
const JWT_SECRET = "MY_SUPER_SECRET_KEY";
const JWT_EXPIRE = "1d";
exports.generateToken = (user) => {
    return jwt.sign({
        id:user.id,
        email:user.email,
        role:user.role
    },
    JWT_SECRET,{expiresIn:JWT_EXPIRE}
);
};