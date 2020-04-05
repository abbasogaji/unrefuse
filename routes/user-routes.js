const express = require("express")
const userController = require("../controller/user-controller")
const veriyToken = require("../middleware/auth/verifyToken.mware")
const router = express.Router()

router.post('/api/auth/signup',  userController.createUser)
router.post('/api/auth/login', userController.loginUser)
router.post('/api/auth/authenticate-email', userController.verifyEmail)
router.post('/api/auth/verify', veriyToken)
router.get('/api/user/:id', userController.getUserById)
router.get('/api/user/all', userController.getAllUsers)
// router.get('/api/user/photo', )


module.exports = router;