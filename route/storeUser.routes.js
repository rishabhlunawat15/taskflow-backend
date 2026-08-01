const express = require('express');
const router = express.Router();
const NewUser = require('../controllers/signUp.controller');

router.post('/signUp', NewUser.generateUser);


module.exports = router;