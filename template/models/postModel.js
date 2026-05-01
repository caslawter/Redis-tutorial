const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/posts.json');

const initializeDatabase = async () => {
  try {
    const dataDir = path.dirname(dataFilePath);
    await fs.mkdir(dataDir, { recursive: true });
    try {
      await fs.access(dataFilePath);
    } catch {
      await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
    }
  } catch (err) {
    throw new Error(`Failed to initialize posts database: ${err.message}`);
  }
};

const getAllPosts = async () => {
  try {
    await initializeDatabase();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read posts: ${err.message}`);
  }
};

const getPostById = async (id) => {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.id === parseInt(id)) || null;
  } catch (err) {
    throw new Error(`Failed to find post: ${err.message}`);
  }
};

const getPostsByUser = async (userId) => {
  try {
    const posts = await getAllPosts();
    return posts.filter(post => post.userId === parseInt(userId));
  } catch (err) {
    throw new Error(`Failed to get posts by user: ${err.message}`);
  }
};

const createPost = async (userId, username, title, content) => {
  try {
    const posts = await getAllPosts();

    const newPost = {
      id: posts.length + 1,
      userId,
      username,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
    return { success: true, post: newPost };
  } catch (err) {
    throw new Error(`Failed to create post: ${err.message}`);
  }
};

module.exports = { getAllPosts, getPostById, getPostsByUser, createPost };
