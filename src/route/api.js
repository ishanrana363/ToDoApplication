const express = require('express');
const { registration, login, userProfile, updateUserProfile } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { createTask, taskByUser, updateTask, deleteTask, getTaskById, taskStatusUpdate, allTask } = require('../controller/taskController');

const router = express.Router();

// user related api
router.post("/register", registration);
router.post("/login", login);
router.get("/profile", authMiddleware, userProfile);
router.put("/update-profile", authMiddleware, updateUserProfile);

// task related api

router.post("/tasks", authMiddleware, createTask);
router.get("/all-task", allTask);
router.get("/task-by-user", authMiddleware, taskByUser);
router.get("/task-by-id/:id", authMiddleware, getTaskById);
router.put("/task-update/:id", authMiddleware, updateTask);
router.put("/task-status-update/:id", authMiddleware, taskStatusUpdate);
router.delete("/task-delete/:id", authMiddleware, deleteTask);


module.exports = router;