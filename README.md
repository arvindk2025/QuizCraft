# QuizCraft ( A MERN Stack Quiz Web-Application )

A simple quiz application with user authentication using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It incorporates full CRUD operations with token-based authentication (JWT).

## Features

### 1) User Authentication ( Must )
- **User Authentification And Authorization**: We are providing 2 types of role during signup.
  
    ```sh
     1) User 2) Admin
    ```
- After Signup user or admin can login using email and password . For Example ->
   
    ```sh
      email    : user3@gmail.com
      Password : Arvind@123
      Note : This is already created user if you want then you can create.
    
      email    : admin2@gmail.com
      Password : Arvind@123
      Note : This is already created admin if you want then you can create.
    ```

### 2) Admin Functionality 

i) **Login Authentication**:
   ```
    - Admin login with error message for invalid credentials and redirection to the dashboard upon successful login.
   ```
ii) **Quiz Creation** :
   
   ```
    - Admin will be able to create new quizzes. Quizzes includes title , description & timer . And Qquestion
    - Admin can create questions for quizes with options and correct answer.
   ```
iii) **Quiz Management** :

   ```
     - Admin will be able to Add, Edit & Delete questions for each quiz.
   ```

### 3) User Functionality 
i) **Listing of All Quizzes**:
   
   ```
    - User will be able to see all available quizzes added by the admin.
    - I have implemented proper Pagination Functionality if available quizzes is large.
   ```
ii) **Taking a Quizz**:
   
   ```
       - User will be able to take quizzes.
       - Displaying only one question at a time with options. 
       - Allowing users to select their answers and move to the next question.
       - At the end of the quiz, displaying the user's score.
   ```
iii) **Quiz Results**:
   
   ```
     - Storing and displaying quiz results after attempting and clicking on submit quiz.
     - Showing the user's score, questions attempted and correct/incorrect answers.
   ```

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Installation

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository:
   ```sh
     git clone https://github.com/yourusername/quiz-web-app.git
     cd quiz-web-app
   ```
   
2. Install backend dependencies:
   ```sh
    cd backend
    npm install
   ```
   
3. Set up environment variables:
    Create a .env file in the backend directory with the following content:
   ```sh
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```sh
    npm run dev
   ```

###  Frontend Setup

1. Install frontend dependencies:
``` sh
    cd ../frontend
    npm install
```

2. Start the frontend server:
``` sh
    npm run dev
```
The application should now be running, with the frontend accessible at http://localhost:5173 and the backend at http://localhost:3000.

### API Endpoints
#### Auth
POST /api/auth/register: Sign Up User.
POST /api/auth/login: Authenticate admin/user and return a JWT token.

#### Admin
GET /api/admin/quizzes: Get all quizzes.

POST /api/admin/quizzes: Add a new quiz.

PUT /api/admin/quizzes/:id: Update a quiz.

DELETE /api/admin/quizzes/:id: Delete a quiz.

GET /api/admin/quizzes/:id/questions: Get all questions for a quiz.

POST /api/admin/quizzes/:id/questions: Add a new question to a quiz.

PUT /api/admin/questions/:id: Update a question.

DELETE /api/admin/questions/:id: Delete a question.

GET /api/admin/scores: Get scores for all users or a particular quiz.

#### User
GET /api/quizzes: Get all available quizzes.

POST /api/quizzes/:id/attempt: Attempt a quiz.

GET /api/users/:id/attempts: Get all attempts for a user
