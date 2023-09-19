const express = require('express');
const router = express.Router();
const profilesController = require('../controllers/profiles');

router.get('/home', profilesController.renderProfile);
router.get('/new', profilesController.newProfile);
router.post('/create', profilesController.create)

module.exports = router;
