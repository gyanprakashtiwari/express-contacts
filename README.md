# Node.js REST API

A RESTful API built with Node.js, Express, and MongoDB, featuring JWT-based user authentication and contact management.

## Features

- User signup/login with JWT authentication.
- CRUD operations for user contacts.
- Request logging middleware.
- MongoDB database with Mongoose.

## Setup

1. Clone the repository:
   ```
   git clone git@github.com:gyanprakashtiwari/express-contacts.git
   ```
2. Navigate to the project directory:

```
cd express-contacts
```

3. Install dependencies:

```
npm install
```

4. Create a .env file in the project root:

````
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key

````

5. Start the server locally:

```
   npm run dev
```
