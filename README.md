# Task Management Api

## Project Overview
This Task Management API was built using Node.js, Express, and MongoDB. It includes user authentication and authorization functionality, allowing only admins to manage tasks. The API supports CRUD operations for functions and user management with role-based access control.

## Features
* User registration and login
* Role-based access control (Admin role required for task management)
* Task CRUD operations (Create, Read, Update, Delete)
* JWT-based authentication
  

## Technologies
* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt(for password hashing)
* JWT(JSON Web Tokens)
  

## Overview of Endpoints
#### 1. User Registration

  * URL: ``` /register ```
  * Method: ``` POST ```
  * Request Example
  ``` 
  {
     "name": "John Doe",
     "email": "admin@example.com",
     "password": "password123",
     "role": "admin"
  }
  ```

#### 2. User Login

  * URL: ``` /login ```
  * Method: ``` POST ```
  * Request Example
  ``` 
  {
     "email": "admin@example.com",
     "password": "password123",
     "role": "admin"
  }
  ```

#### 3. Admin Access Example

  * URL: ``` /admin ```
  * Method: ``` GET ```
  * Request Example
  ``` 
  {
    Authorization: Bearer your_jwt_token
  }
  ```
#### 4. Create New Task

  * URL: ``` /tasks ```
  * Method: ``` POST ```
  * Request Example
  ``` 
 {
    "title": "New Task",
    "assignee": "John Doe",
    "status": "pending",
    "priority": "high"
}
  ```

#### 5. Update Task

  * URL: ``` /tasks/:id ```
  * Method: ``` PATCH ```
  * Request Example
  ``` 
 {
    "title": "New Task",
    "assignee": "Jane Smith",
    "status": "pending",
    "priority": "high"
}
  ```

#### 6. Update Task

  * URL: ``` /tasks/:id ```
  * Method: ``` DELETE ```


## Installation
 #### 1. Clone the repository:
   ```
    git clone https://github.com/Junaidify/Task-Management-Api.git
   ```

 #### 2. Run the Server
  * npm start
