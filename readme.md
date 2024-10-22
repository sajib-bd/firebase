# Node.js CRUD Application with Firebase Firestore

This project is a simple Node.js CRUD (Create, Read, Update, Delete) application that utilizes Firebase Firestore as the database. It allows users to manage user data with features to create, retrieve, update, and delete users.

## Features

- Create a new user
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Delete a user by ID

## Technologies Used

- Node.js
- Express.js
- Firebase Firestore
- dotenv (for environment variable management)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Firebase account and Firestore database set up
- A text editor (like VSCode) or IDE

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your Firebase project:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (if you haven't already).
   - Navigate to Firestore Database and create a new database.
   - Create a new web application to obtain your Firebase configuration.

4. Create a `.env` file in the root directory of the project and add your Firebase configuration:
   ```plaintext
   API_KEY=your-api-key
   AUTH_DOMAIN=your-auth-domain
   PROJECT_ID=your-project-id
   STORAGE_BUCKET=your-storage-bucket
   MESSAGING_SENDER_ID=your-messaging-sender-id
   APP_ID=your-app-id
   MEASUREMENT_ID=your-measurement-id
   ```

### Running the Application

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:4000`.

### API Endpoints

- **Create User**: `POST /users/create`

  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```

- **Get All Users**: `GET /users/get`

- **Get User by ID**: `GET /users/:id`

- **Update User**: `PUT /users/update/:id`

  - Request body:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
    ```

- **Delete User**: `DELETE /users/delete/:id`

### Error Handling

The application includes basic error handling for user creation, retrieval, updating, and deletion, returning appropriate HTTP status codes and messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Firebase Documentation](https://firebase.google.com/docs)
- [Express.js Documentation](https://expressjs.com/)
