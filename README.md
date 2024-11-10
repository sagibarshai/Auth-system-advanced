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

Setup
1. Clone the repository:

git clone https://github.com/sagibarshai/Auth-System.git

cd Auth-System

2. Set up the environment variables by creating a .env file:

PORT=
JWT_KEY=
COOKIE_SECRET=
EMAIL_ADDRESS=
EMAIL_ACCESS_KEY=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_HOST=

---


Running the Project
- Build and start the project:

docker-compose up --build

-  Stop the project:

docker-compose down
