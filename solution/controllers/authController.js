const userModel = require('../models/userModel');

// Render login page
exports.getLoginPage = (req, res) => {
  res.render('login', { message: '' });
};

// Render register page
exports.getRegisterPage = (req, res) => {
  res.render('register', { message: '' });
};

// Handle login
exports.handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('login', { message: 'Please enter username and password' });
    }

    const result = await userModel.verifyUser(username, password);

    if (result.success) {
      req.session.user = result.user;
      res.redirect('/posts');
    } else {
      res.render('login', { message: result.message });
    }
  } catch (err) {
    next(err);
  }
};

// Handle registration
exports.handleRegister = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.render('register', { message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.render('register', { message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.render('register', { message: 'Password must be at least 6 characters' });
    }

    const result = await userModel.createUser(username, email, password);

    if (result.success) {
      res.render('login', { message: 'Registration successful! Please login.' });
    } else {
      res.render('register', { message: result.message });
    }
  } catch (err) {
    next(err);
  }
};

// Handle logout
exports.handleLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
