const express = require('express');
const { registration } = require('../controller/userController');

const router = express.Router();


router.post("/register", registration);


module.exports = router;