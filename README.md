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
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (e.g., Login, Register)
│   │   ├── assets/         # Static assets (e.g., logos)
│   │   └── ...             # Other frontend files
│   ├── package.json        # Frontend dependencies
│   └── ...                 # Configuration files (e.g., vite.config.js)
│
├── server/                 # Backend application
│   ├── config/             # Configuration files (e.g., db connection)
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication and validation middleware
│   ├── models/             # Mongoose schemas (e.g., User model)
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (e.g., email templates)
│   ├── index.js            # Server entry point
│   ├── package.json        # Backend dependencies
│   └── ...                 # Other backend files
│
├── .gitignore              # Git ignore rules
├── package.json            # Root dependencies (if monorepo)
└── README.md               # Project documentation
```
