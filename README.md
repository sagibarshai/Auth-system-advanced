
# Auth-System Advanced



# Getting Started:
Prerequisites
Docker, Git

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
