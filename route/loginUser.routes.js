const express = require('express');
const router = express.Router();
const User = require('../controllers/login.controller');

router.post('/auth', User.CheckUser);


module.exports = router;