const { redisClient } = require('../redisClient');

const POST_RATE_LIMIT = 1; 
const POST_RATE_WINDOW = 3600; // max 2 post per hour

const postRateLimit = async (req, res, next) => {
  const { id } = req.session.user;
  const key = `rate:posts:${id}`;

  const count = await redisClient.incr(key);
  if (count === 1) await redisClient.expire(key, POST_RATE_WINDOW);

  if (count > POST_RATE_LIMIT) {
    return res.render('newPost', {
      user: req.session.user,
      message: `Post limit reached. You can create ${POST_RATE_LIMIT} posts per hour.`,
    });
  }

  next();
};

module.exports = postRateLimit;
