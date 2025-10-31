# MERN Todo App with Authentication

A full-stack todo application built with MongoDB, Express, React, and Node.js (MERN stack) featuring user authentication and a clean, modern UI.

## Features

- **User Authentication**
  - Register new account
  - Login with username and password
  - JWT-based authentication
  - Protected routes

- **Dashboard**
  - Personalized welcome message with username
  - Add new todos
  - View all todos for logged-in user
  - Delete todos
  - Logout functionality

- **Security**
  - Passwords hashed with bcrypt
  - JWT tokens for secure authentication
  - User-specific todos (users can only see their own todos)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- Vite for fast development
- Axios for API calls
- Clean, minimal CSS design

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   ├── User.js          # User model with password hashing
│   │   └── Todo.js          # Todo model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes (register, login, me)
│   │   └── todos.js         # Todo CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Express server setup
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx    # Login form component
    │   │   ├── Register.jsx # Registration form component
    │   │   └── Dashboard.jsx # Dashboard with todo list
    │   ├── App.jsx          # Main app component
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-secret-key-change-this-in-production
   PORT=5000
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

4. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

### Authentication Routes

- **POST** `/api/auth/register` - Register a new user
  - Body: `{ username, password }`
  - Returns: `{ token, user }`

- **POST** `/api/auth/login` - Login existing user
  - Body: `{ username, password }`
  - Returns: `{ token, user }`

- **GET** `/api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

### Todo Routes (All require authentication)

- **GET** `/api/todos` - Get all todos for current user
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of todos

- **POST** `/api/todos` - Create a new todo
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ text }`
  - Returns: Created todo

- **DELETE** `/api/todos/:id` - Delete a todo
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

- **PATCH** `/api/todos/:id` - Update todo completion status
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ completed }`
  - Returns: Updated todo

## Usage

1. **Register**: Create a new account with a username and password (minimum 6 characters)
2. **Login**: Sign in with your credentials
3. **Add Todos**: Type in the input field and click "Add" to create a new todo
4. **Delete Todos**: Click the "Delete" button next to any todo to remove it
5. **Logout**: Click the "Logout" button to sign out

## Security Features

- Passwords are hashed using bcrypt before storing in database
- JWT tokens expire after 7 days
- Authentication required for all todo operations
- Users can only access their own todos
- CORS enabled for cross-origin requests

## Development

### Backend Scripts
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart on changes)

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Future Enhancements

Potential features to add:
- Todo completion toggle (mark as done/undone)
- Edit existing todos
- Todo categories or tags
- Due dates
- Search/filter functionality
- Dark mode
- Email verification
- Password reset functionality
- User profile settings

## License

MIT
