** 
Auth-System
**

A robust and scalable Node (Express) backend application with a full authentication flow, error handling, and modular structure for easy extension.
This project is designed with a focus on maintainability, type safety with TypeScript, and quick environment setup with Docker Compose.

---

Authentication:
Includes the full authentication flow:

- Signup: Users can sign up with their email and password.
- Email Verification: Users must verify their email before logging in.
- Signin: Users can log in with their credentials.
- Signout: Users can log out, which destroys the authentication token.

---

Security:
- Passwords are securely hashed using bcrypt before storing them in the database.
- Email verification is required before login is allowed, preventing unauthorized access.
- Cookie-based JWT:
The authentication token is stored in a secure cookie, ensuring a stateless session while preventing common security issues such as CSRF attacks.
The token is set on successful login and is used for verifying the user's identity on subsequent requests.

---

Database Integration:

- Users are stored and updated in a PostgreSQL database.
The user data (including email, hashed password, and verification status) is saved during signup.

- User updates (e.g., update date of last login or verifying the email) are reflected in the database.

- Login, the system checks the credentials against the database, and the email is verify flag.- 

---

Error Handling:
Comprehensive Handling:
Modular error functions, parsers, and middleware ensure streamlined and consistent error management.

---

Extensible:
Easily customizable error-handling flow for new or complex requirements.

---

Middlewares:
- Access Control:
currentUser and requireAuth middlewares enforce access restrictions.

- Validation:
validationError middleware ensures validation consistency.

---

PostgreSQL Database:
- Configured with a users table for storing user details. Supports environment-specific settings for flexibility.

---

Configuration:
- Centralized Configuration:
Environment variables and app settings are managed in a single configuration file, making it easy to adjust settings for different environments.

---

Utilities:
- Reusable Functions:
Helper functions are organized within a utils folder to streamline common tasks and improve code readability.

---

Docker Compose:
- Service Management:
A docker-compose.yaml file sets up both backend and PostgreSQL services, allowing for quick setup and easy environment replication across systems.

---

TypeScript:
- Full TypeScript support across the codebase ensures type safety and improves maintainability.
- types folder configured with tsconfig.json

---

Folder Structure:
- Feature-based Organization:
Each feature has a dedicated subfolder, including controller, model, and route files. This structure is modular, organized, and easy to navigate.

---

Extensibility:
- The clear, modular setup supports adding new features and services with minimal configuration. Perfect as a base project to clone for new applications.

---
---

Getting Started:
Prerequisites
Docker
git

---

This guide provides two options for setting up the environment variables and running the project. Choose the option that best fits your needs.

# Option 1: Single .env File in the Backend Folder
1. Clone the Repository
git clone https://github.com/sagibarshai/Auth-System.git
cd Auth-System
2. Create the .env File
Inside the backend folder, create a file named .env to hold the environment variables for configuration and database settings.
File Location: backend/.env

Contents of the .env file:

General Configuration
PORT=value
JWT_KEY=value
COOKIE_SECRET=value
EMAIL_ADDRESS=value
EMAIL_ACCESS_KEY=value

Database Configuration
POSTGRES_USER=value
POSTGRES_PASSWORD=value
POSTGRES_DATABASE=value
POSTGRES_PORT=value
POSTGRES_DB=value
POSTGRES_HOST=value

Optional Settings
JWT_EXPIRED_IN=value
COOKIES_EXPIRED_IN=value
Replace value with your actual values for each configuration.

3. Running the Project
Run the following command to build and start the project using Docker Compose. It will automatically use the environment variables defined in the .env file located in the backend directory.

docker-compose --env-file ./backend/.env up --build
4. Stopping the Project
To stop the project, run:

docker-compose down


# Option 2: Two .env Files (One in the Backend Folder and One in the Root Directory)
1. Clone the Repository
git clone https://github.com/sagibarshai/Auth-System.git
cd Auth-System
2. Create Two .env Files
Backend .env file (located in backend/.env)
Contents of the .env file:

General Configuration
PORT=value
JWT_KEY=value
COOKIE_SECRET=value
EMAIL_ADDRESS=value
EMAIL_ACCESS_KEY=value

Database Configuration
POSTGRES_USER=value
POSTGRES_PASSWORD=value
POSTGRES_DATABASE=value
POSTGRES_PORT=value
POSTGRES_DB=value
POSTGRES_HOST=value

Optional Settings
JWT_EXPIRED_IN=value
COOKIES_EXPIRED_IN=value
Root .env file (located in the project root folder)
Contents of the .env file:

Database Configuration (matching with backend/.env)
POSTGRES_USER=value
POSTGRES_PASSWORD=value
POSTGRES_DATABASE=value
POSTGRES_PORT=value
Replace value with your actual values for each configuration.

3. Running the Project
To start the project with Docker Compose, run the following command:

docker-compose up --build
This will build the services and start them using the environment variables defined in both .env files—one in the root directory and one in the backend directory.

4. Stopping the Project
To stop the project, run:

docker-compose down
