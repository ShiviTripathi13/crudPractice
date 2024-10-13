const userdb = require('../model/userSchema');
const {hashPassword, comparePassword} = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');
const jwtSecret = require('../config/config').JWT_SECRET;

const JWT_SECRET = process.env.JWT_SECRET || jwtSecret;


// Create and save a new user -> RegisterController
const registerController = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        
        if(!name){
            return res.status(400).json({
                message : "Please enter your name"
            })
        }
        if(!email){
            return res.status(400).json({
                message : "Please enter your email"
            })
        }
        if(!password){
            return res.status(400).json({
                message : "Please enter your password"
            })
        }

        const user = await userdb.findOne({email});
        if(user){
            return res.status(400).json({
                message : "User already exists. Please log in"
            })
        }

        // hashed password
        const hashedPassword = await hashPassword(password);

        const newUser = await new userdb({
            name,
            email,
            password : hashedPassword
        });
        await newUser.save();

        res.status(200).json({
            success : true,
            message : "User registerd successfully",
            data : {
                newUser
            }
        })
    }
    catch(err){
        res.status(400).json({
            success : false,
            message : "Something went wrong in registration." + err.message
        })
    }
}


// Login of existing user -> login controller
const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;

        // check if email and password are entered
        if(!email){
            return res.status(400).json({
                message : "Please enter your email"
            })
        }
        if(!password){
            return res.status(400).json({
                message : "Please enter your password"
            })
        }

        // check if user exists
        const user = await userdb.findOne({email});

        // if user does not exist
        if(!user){
            return res.status(400).send({
                success : false,
                message : "User not found. Please register!"
            })
        }

        // if user exists, compare password
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(400).send({
                success : false,
                message : "Invalid password. Please try again!"
            })
        }

        // create token
        const token = JWT.sign({id : user._id}, JWT_SECRET, {expiresIn : "7d"});
        // res.cookie("auth", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "None"
        // });

        res.status(200).send({
            success: true,
            message : "User logged in successfully",
            user : {
                name : user.name,
                email : user.email,
            },
            token : token,
            cookie : req.cookies

        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Something went wrong in login." + err.message
        })
    }

   
}

// update user profile -> update controller
const updateUserController = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await userdb.findOne({_id : req.user.id});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = await hashPassword(password);
        }
        await user.save();
        res.status(200).json({
            success : true,
            message : "User updated successfully",
            data : {
                user
            }
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "Something went wrong in updating user profile." + err.message
        })
    }
}


module.exports = {
    registerController,
    loginController,
    updateUserController
}