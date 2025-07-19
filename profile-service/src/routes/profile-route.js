
const express = require('express');
const router = express.Router();

const  SetupProfile = require('../controllers/profile-controller')


router.post('/setupProfile' , SetupProfile)


module.exports = router