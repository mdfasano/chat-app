const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');


router.get('/profiles/posts/new', postsController.new);
router.get('/profiles/posts/index', postsController.index);
router.post('/:id/posts/create', postsController.create);
router.delete('/profiles/:id/delete', postsController.delete);


module.exports = router;