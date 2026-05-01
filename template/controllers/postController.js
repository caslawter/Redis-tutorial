const postModel = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const start = performance.now();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const posts = await postModel.getAllPosts();
    const duration = (performance.now() - start).toFixed(3);
    console.log(`[posts] fetched ${posts.length} posts in ${duration}ms`);
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
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
};
