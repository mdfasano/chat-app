const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/test', userController.test);

module.exports = router;
