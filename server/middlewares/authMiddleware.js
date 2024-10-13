const JWT = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ||  require('../config/config').JWT_SECRET;

// login middleware
const loginMiddleware = (req, res, next) => {
    try{
        // console.log(req.headers.authorization);
        const decoded = JWT.verify(req.headers.authorization, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "something went wrong in login"
        });
        console.log(err);
    }
};

module.exports = {loginMiddleware};