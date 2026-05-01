const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/users.json');

const initializeDatabase = async () => {
  const dataDir = path.dirname(dataFilePath);
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
  }
};

const getAllUsers = async () => {
  try {
    await initializeDatabase();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Failed to read users: ${err.message}`);
  }
};

const findUserByUsername = async (username) => {
  try {
    const users = await getAllUsers();
    return users.find(user => user.username === username);
  } catch (err) {
    throw new Error(`Failed to find user by username: ${err.message}`);
  }
};

const findUserByEmail = async (email) => {
  try {
    const users = await getAllUsers();
    return users.find(user => user.email === email);
  } catch (err) {
    throw new Error(`Failed to find user by email: ${err.message}`);
  }
};

const createUser = async (username, email, password) => {
  try {
    const users = await getAllUsers();

    if (await findUserByUsername(username) || await findUserByEmail(email)) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));
    return { success: true, message: 'User created successfully', user: newUser };
  } catch (err) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

const verifyUser = async (username, password) => {
  try {
    const user = await findUserByUsername(username);
    if (user && user.password === password) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid username or password' };
  } catch (err) {
    throw new Error(`Failed to verify user: ${err.message}`);
  }
};

module.exports = {
  getAllUsers,
  findUserByUsername,
  findUserByEmail,
  createUser,
  verifyUser,
  initializeDatabase
};
