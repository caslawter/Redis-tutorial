# Express Login App

A simple login application built with Express.js, EJS, and a JSON-based database following MVC architecture.

## Project Structure

```
redis-tutorial/
├── app.js                 # Main server file
├── package.json           # Project dependencies
├── controllers/
│   └── authController.js  # Authentication logic
├── models/
│   └── userModel.js       # Database operations
├── routes/
│   └── authRoutes.js      # Route definitions
├── views/
│   ├── index.ejs          # Home page
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration page
│   └── dashboard.ejs      # Dashboard (after login)
└── data/
    └── users.json         # User database (auto-created)
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate users with username and password
- **Dashboard**: View user information after successful login
- **JSON Database**: Simple file-based storage in `data/users.json`
- **MVC Architecture**: Clean separation of concerns

## Usage

1. **Register**: Click on "Register" and create a new account
2. **Login**: Use your credentials to login
3. **View Dashboard**: After login, you'll see your user information
4. **Logout**: Click logout to return to the home page

## Database Structure

Users are stored in `data/users.json`:

```json
[
  {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "createdAt": "2026-05-01T10:30:00.000Z"
  }
]
```

## Security Note

⚠️ **This is a demo application. For production use:**
- Hash passwords using bcrypt
- Implement session management or JWT tokens
- Use a proper database (MongoDB, PostgreSQL, etc.)
- Add input validation and sanitization
- Use HTTPS
- Implement CSRF protection

## Technologies Used

- **Express.js**: Web framework
- **EJS**: Template engine
- **Node.js**: Runtime environment
- **JSON**: Data storage
