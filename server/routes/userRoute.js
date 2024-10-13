const {registerController,
        loginController,
        updateUserController} = require('../controllers/userController.js');

const {loginMiddleware} = require('../middlewares/authMiddleware.js');
const express = require('express');
const router = express.Router();

// signup / register route
router.post('/register', registerController);

// login route
router.post('/login', loginController);

// user protected route
router.get('/userauth', loginMiddleware, (req, res) => {
    res.status(200).send({
        success : true,
        message : "You are logged in"
    })
});

// update user profile -> update route -> user protected route
router.put('/update',loginMiddleware, updateUserController);

module.exports = router;