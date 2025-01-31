const express = require('express');
const { registration, login, userProfile, updateUserProfile } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post("/register", registration);
router.post("/login", login );
router.get("/profile", authMiddleware,userProfile );
router.put("/update-profile", authMiddleware, updateUserProfile );


module.exports = router;