const express = require('express');
const { registration, login, userProfile } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post("/register", registration);
router.post("/login", login );
router.get("/profile", authMiddleware,userProfile )


module.exports = router;