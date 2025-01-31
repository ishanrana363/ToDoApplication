const express = require('express');
const { registration, login } = require('../controller/userController');

const router = express.Router();


router.post("/register", registration);
router.post("/login", login )


module.exports = router;