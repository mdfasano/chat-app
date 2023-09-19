const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');


router.post('/profiles/:id/comments/create', commentsController.create);
router.get('/profiles/:id/comments/index', commentsController.index);


module.exports = router;