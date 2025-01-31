const express = require('express');
const { registration, login, userProfile, updateUserProfile } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { createTask } = require('../controller/taskController');

const router = express.Router();

// user related api
router.post("/register", registration);
router.post("/login", login );
router.get("/profile", authMiddleware,userProfile );
router.put("/update-profile", authMiddleware, updateUserProfile );

// task related api

router.post("/tasks", authMiddleware, createTask )


module.exports = router;