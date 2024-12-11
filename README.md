# HelloApp

HelloApp is a real-time chat application built using Spring Boot, WebSocket, React.js, and MongoDB.

## Features

- Real-time messaging with WebSocket
- User authentication and management
- Persistent storage with MongoDB
- Modern frontend with React.js

## Architecture

- **Backend**: Spring Boot application with WebSocket support, MongoDB for data storage.
- **Frontend**: React.js application using Vite for development and build.

## Installation

### Prerequisites

- Java 21
- Node.js
- MongoDB

### Backend Setup

1. Navigate to the `chat-app-backend` directory.
2. Build the application using Maven:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the `HelloApp` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to start chatting.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

