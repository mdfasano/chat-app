const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');


router.post('/profiles/:id/comments/create', commentsController.create);

module.exports = router;