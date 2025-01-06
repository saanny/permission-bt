# Description
This project is a backend application built with TypeScript and NestJS that implements a permission system inspired by real-world scenarios. The goal is to develop a scalable and flexible solution for managing permissions within the application.

## Project Setup

Follow these steps to set up and run the project using Docker:

### Prerequisites

- Docker
- Docker Compose 

### Configuration

Create a `.env` file in the root directory of the project.

Set the following environment variables in the `.env` file:

Adjust the values according to your specific setup and requirements.

### Running the Application with Docker

Build the Docker containers:

```shell
docker-compose build
```
Start the Docker containers
```shell
docker-compose up -d
```
Access the API endpoints using a tool like cURL or Postman.
The application will be accessible at http://localhost:3000.