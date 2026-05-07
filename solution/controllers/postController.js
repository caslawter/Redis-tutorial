const postModel = require('../models/postModel');
const { redisClient } = require('../redisClient');

const CACHE_KEY = 'posts';
const CACHE_TTL = 3600;

exports.getAllPosts = async (req, res, next) => {
  try {
    const start = performance.now();

    const cached = await redisClient.get(CACHE_KEY);
    if (cached) {
      const duration = (performance.now() - start).toFixed(3);
      console.log(`[posts] cache hit — served in ${duration}ms`);
      return res.render('posts', { posts: JSON.parse(cached), user: req.session.user || null });
    }

    const posts = await postModel.getAllPosts();
    await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(posts));

    const duration = (performance.now() - start).toFixed(3);
    console.log(`[posts] cache miss — fetched ${posts.length} posts in ${duration}ms`);
    res.render('posts', { posts, user: req.session.user || null });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await postModel.getPostById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post, user: req.session.user || null });
  } catch (err) {
    next(err);
  }
};

exports.getNewPostForm = (req, res) => {
  res.render('newPost', { user: req.session.user, message: '' });
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.render('newPost', { user: req.session.user, message: 'Title and content are required' });
    }
    const { id, username } = req.session.user;
    await postModel.createPost(id, username, title, content);
    await redisClient.del(CACHE_KEY);
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
};
