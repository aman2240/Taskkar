# Task Management Application - MERN Stack

A full-stack task management application built with MongoDB, Express.js, React.js, and Node.js. This application provides complete CRUD operations for tasks with user authentication using JWT.

## Features

- ✅ User Authentication (Login & Registration) with JWT
- ✅ Create, Read, Update, Delete Tasks
- ✅ Mark tasks as completed/pending/in-progress
- ✅ Search tasks with debouncing (500ms delay)
- ✅ Pagination (10 tasks per page)
- ✅ Priority levels (Low, Medium, High)
- ✅ Responsive UI design
- ✅ Protected routes with middleware
- ✅ User-specific task management

## Tech Stack

**Frontend:**
- React.js 19
- React Router DOM
- Context API for state management
- Date-fns for date formatting
- CSS3 with custom styling

**Backend:**
- Node.js
- Express.js 5
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing

## Prerequisites

Before running this application, make sure you have:
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters_long
```

**Important:** Replace the values with:
- Your actual MongoDB connection string from MongoDB Atlas
- A secure JWT secret key (at least 32 characters)

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:4000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register a new account:**
   - Navigate to `/signup`
   - Enter your name, email, and password
   - Click "Sign Up"

2. **Login:**
   - Navigate to `/login`
   - Enter your registered email and password
   - Click "Login"

3. **Manage Tasks:**
   - Create new tasks using the form on the right
   - Search tasks using the search bar (with 500ms debouncing)
   - Edit tasks by clicking the edit icon
   - Mark tasks as complete using the check icon
   - Delete tasks using the delete icon
   - Navigate through pages if you have more than 10 tasks

## API Endpoints

### Authentication Routes
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user

### Task Routes (Protected)
- `GET /api/tasks?page=1&limit=10&search=query` - Get all user tasks with pagination and search
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Mark task as completed

All task routes require `Authorization: Bearer <token>` header.

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Task Schema
```javascript
{
  title: String (required),
  description: String (required),
  priority: String (enum: ['low', 'medium', 'high']),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  userId: String (required),
  timestamps: true
}
```

## Features Implementation

### 1. Authentication
- JWT-based authentication with 7-day expiry
- Password hashing using bcrypt (10 salt rounds)
- Protected routes using middleware
- Persistent login using localStorage

### 2. Search with Debouncing
- Real-time search across task titles and descriptions
- 500ms debouncing to reduce API calls
- Case-insensitive regex search

### 3. Pagination
- 10 tasks per page
- Previous/Next navigation buttons
- Page counter display
- Automatic reset on search

### 4. Task Management
- Full CRUD operations
- Inline editing
- Priority and status badges with color coding
- Task completion tracking
- Time stamps with relative time display

## Project Structure

```
├── backend/
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── requireAuth.js
│   ├── models/
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── tasks.js
│   │   └── user.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── TaskDetails.js
│   │   │   └── TaskForm.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── TaskContext.js
│   │   ├── hooks/
│   │   │   ├── useAuthContext.js
│   │   │   ├── useLogin.js
│   │   │   ├── useLogout.js
│   │   │   ├── useSignup.js
│   │   │   └── useTasksContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- User-specific data access
- Environment variables for sensitive data

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the ISC License.

## Author

Created as part of a MERN Stack Internship Assignment
