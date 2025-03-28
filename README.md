# Task Management System

A full-stack web application for task management between admins and faculty. Admins can assign tasks to specific faculty members, and faculty can view and mark tasks as complete (with file attachments). The project uses React for the frontend, Node.js/Express for the backend, and MySQL for the database.

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

# Features

- *User Authentication:*  
  - Faculty and Admin registration/login using JWT.
  
- *Task Management:*  
  - Admins can create and assign tasks to specific faculty members.
  - Faculty can view their assigned tasks and mark tasks as complete (with optional file uploads).
  
- *File Uploads:*  
  - Admins and faculty can upload files for tasks. Files are stored on the server and served statically.
  
- *Dashboard Views:*  
  - Admin Dashboard displays statistics (total faculty, tasks, completed tasks), a list of faculty, and recent tasks.
  - Faculty Dashboard displays their assigned tasks along with file attachments for easy viewing.

# Tech Stack

- *Frontend:*  
  - React (with React Router v6)
  - CSS (custom styling; optionally, Tailwind CSS can be used)
  
- *Backend:*  
  - Node.js with Express
  - JSON Web Tokens (JWT) for authentication
  - Multer for file uploads
  
- *Database:*  
  - MySQL

# File Structure

```plaintext
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── facultyController.js
│   │   └── taskController.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── faculty.js
│   │   └── tasks.js
│   ├── .env
│   └── server.js
└── frontend
    ├── public
    │   └── index.html
    ├── src
    │   ├── components
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── AdminDashboard.js
    │   │   ├── FacultyDashboard.js
    │   │   ├── TaskAssignment.js
    │   │   ├── TaskDetail.js
    │   │   └── Profile.js
    │   ├── utils
    │   │   └── api.js
    │   ├── App.css
    │   ├── App.js
    │   └── index.js


Installation
Backend Setup
Navigate to the backend folder:


cd backend
Install dependencies:
npm install

Create a .env file in the backend folder with your configuration:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_management
JWT_SECRET=your_jwt_secret
ADMIN_CODE=adminspecialcode

Start the backend server:
npm run dev


Frontend Setup
Navigate to the frontend folder:

cd frontend
Install dependencies:
npm install

Start the frontend server:
npm start


Database Setup
Use a MySQL client to run the following SQL commands:

CREATE DATABASE task_management;
USE task_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('faculty', 'admin'),
  faculty_subject VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  due_date DATE,
  attachment VARCHAR(255),
  assigned_to INT,
  status ENUM('assigned', 'completed') DEFAULT 'assigned',
  completed_at TIMESTAMP NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);


Usage


Admin Functions:

Register or log in as an admin.

Access the Admin Dashboard to view statistics, the faculty list, and recent tasks.

Use the "Assign Task" button to create and assign tasks to faculty.

View any files uploaded by faculty on task details.


Faculty Functions:

Register or log in as a faculty member.

Access the Faculty Dashboard to see tasks assigned to you.

Click on a task to view details and any attachments.

Mark tasks as complete and optionally upload a file as evidence.


API Endpoints

Authentication
POST /api/auth/register – Register a new user (admin or faculty).

POST /api/auth/login – Log in and receive a JWT.

Faculty
GET /api/faculty – Get a list of faculty members (Admin only).

Tasks
POST /api/tasks – Create and assign a new task (Admin only).

GET /api/tasks – Get tasks (Admin sees all tasks; faculty sees only their tasks).

PUT /api/tasks/:taskId/complete – Mark a task as complete (Faculty).