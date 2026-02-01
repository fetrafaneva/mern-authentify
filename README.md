# MERN-Authentify

A secure, full-stack authentication system built using the MERN stack (MongoDB, Express.js, React, Node.js). This boilerplate provides a robust foundation for user authentication, including email verification and password management.

[![Node.js Version](https://img.shields.io/node/v/express.svg?color=brightgreen)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)

## Overview

MERN-Authentify is designed to streamline the implementation of user authentication in web applications. It features secure token-based authentication, email verification workflows, and a modular structure for easy extension.

## Key Features

- **User Registration and Login**: Secure handling of user credentials with password hashing.
- **Email Verification**: Double opt-in process with congratulatory email upon successful verification.
- **Password Reset**: Forgot password functionality with secure reset links.
- **JWT Authentication**: Access and refresh tokens for session management.
- **Protected Routes**: Middleware for authorizing API endpoints.
- **Responsive UI**: Modern frontend interface with updated branding.
- **Environment Configuration**: Support for `.env` files to manage sensitive data.

## Technology Stack

### Frontend
- React.js (with Vite for fast development)
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js and Express.js for the server
- MongoDB with Mongoose for data modeling
- JWT for token generation and verification
- bcrypt for password security
- Nodemailer for email sending
- Additional utilities: dotenv, cors, cookie-parser

## Project Structure

```text
mern-authentify/
├── client/                 # Frontend application
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components (Header, Navabar)
│   │   ├── pages/          # Application pages (Login, EmailVerify, Home, ResetPassword)
│   │   ├── context/        # Global state management (AppContext)
│   │   ├── assets/         # Static assets (icon, logos)
│   │   ├── routes/         # Application routing (React Router)
│   ├── package.json        # Frontend dependencies
│   ├── .env                # Frontend environment variables
│   └── ...                 # Configuration files (e.g., vite.config.js, package.json.lock)
│
├── server/                 # Backend application
│   ├── config/             # Configuration files (mongodb.js, nodemailer.js, emailTemplate.js)
│   ├── controllers/        # Request handlers (authController.js, userController.js)
│   ├── middleware/         # Authentication and validation middleware (userAuth)
│   ├── models/             # Mongoose schemas (Usermodel)
│   ├── routes/             # API routes (authRoutes, userRoutes)
│   ├── server.js           # Server entry point
│   ├── package.json        # Backend dependencies
│   └── ...                 # Other backend files
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```


## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- Email service account (e.g., Gmail with app password for Nodemailer)

### Steps
1. Clone the repository:
    ```text
    git clone https://github.com/fetrafaneva/mern-authentify.git
    cd mern-authentify
    ```
2. Install dependencies:
    ```text
    For backend
    cd server
    npm install
    For frontend (in a separate terminal)
    cd ../client
    npm install
    ```
3. Configure environment variables:
- Create `.env` in `/server`:
    ```text
    PORT=5000

    MONGO_URI=mongodb://localhost:27017/mern-auth

    JWT_SECRET=your_secure_jwt_secret

    REFRESH_TOKEN_SECRET=your_secure_refresh_secret

    CLIENT_URL=http://localhost:5173

    EMAIL_USER=your.email@gmail.com

    EMAIL_PASS=your_app_password
    ```
- Create `.env` in `/client`:
    ```text
    VITE_BACKEND_URL = 'Your_backend_url'
    ```
4. Start the application:
    ```text
    Backend (from /server)
    npm run server (with nodemon)
    Frontend (from /client)
    npm run dev
    ```

## API Endpoints

| Method | Endpoint                    | Description                                | Authentication Required |
|--------|-----------------------------|--------------------------------------------|-------------------------|
| POST   | `/api/auth/register`        | Register a new user                        | No                      |
| POST   | `/api/auth/login`           | User login                                 | No                      |
| POST   | `/api/auth/logout`          | User logout                                | yes                     |
| POST   | `/api/auth/send-verify-otp` | Send OTP to verify user email              | Yes                     |
| POST   | `/api/auth/verify-account`  | Verify user account using OTP              | Yes                     |
| POST   | `/api/auth/send-reset-otp`  | Send OTP for password reset                | No                      |
| POST   | `/api/auth/reset-password`  | Reset user password after OTP verification | No                      |
| POST   | `/api/auth/verify-reset-otp`| Verify OTP for password reset              | Yes                     |
| GET    | `/api/auth/is-auth`         | Check if the user is authenticated         | No                      |
| GET    | `/api/user/data`            | Retrieve authenticated user profile data   | Yes                     |

## Security Practices

- **Password Hashing**: Utilizes bcrypt for secure storage.
- **Token Management**: Short-lived access tokens with refresh mechanism; tokens stored in HttpOnly cookies.
- **Input Validation**: Implemented on both client and server sides.
- **CORS Protection**: Restricted to frontend origin.
- **Email Security**: Uses secure email transport for verification and resets.

## Demo

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

If this project helps you, consider starring the repository!
