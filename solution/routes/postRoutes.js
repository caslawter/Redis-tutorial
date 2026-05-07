const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');
const postRateLimit = require('../middleware/postRateLimit');

router.get('/posts', postController.getAllPosts);
router.get('/posts/new', requireAuth, postController.getNewPostForm);
router.post('/posts', requireAuth, postRateLimit, postController.createPost);
router.get('/posts/:id', postController.getPost);

module.exports = router;
