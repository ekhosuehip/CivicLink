# CivicLink

CivicLink is a collaborative platform aimed at improving civic engagement through technology. This repository contains the source code for the project.

## Deployment
The API is live and can be accessed here:
🔗 [Civic API](https://civiclink-iq2l.onrender.com)

## **Features**
- Real-time messaging with **Socket.io**
- Chat management for one-on-one and group chats
- User authentication and management
- Messaging system with chat history

## **Technologies Used**
- **Express.js** for building the API.
- **MongoDB** for storing notes and user data.
- **Mongoose** for object modeling and schema definition.
- **TypeScript** for type safety and better maintainability.
- **Socket.io** for real-time communication (messaging and typing indicators).
- **JWT** for user authentication.

### Prerequisites

- Node.js (preferably the latest stable version)
- MongoDB (or access to a MongoDB database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ekhosuehip/CivicLink.git
   cd CivicLink
   ```

2. Push to the repository:

   ```bash
   git status
   git add .
   git commit -m "commit message"
   git checkout -b name_branch # only the first time you are pushing
   git push origin HEAD
   ```

3. Pull from the repository:

   ```bash
   git pull origin main
   ```

## API Endpoints

### Base URLs

- **User Routes**: `/api/v1`
- **Chat Routes**: `/api/v2`
- **Message Routes**: `/api/v3`

### Health Check

- `GET /api/ping` — A simple endpoint to check if the server is running.

### Authentication & User Management

- **Register Citizen**: `POST /api/v1/register/citizen`
- **Register Official**: `POST /api/v1/register/official`
- **Login**: `POST /api/v1/login`
- **Logout**: `POST /api/v1/logout`

### User Info *(Protected Routes)*

- **Get Citizen Info**: `GET /api/v1/citizen`

- **Get Official by Name, Jurisdiction, or Position**: `GET /api/v1/official`

- **Get All Officials**: `GET /api/v1/officials`

### Admin Routes (Auth Token Required)
- **Get All Officials**: `GET /api/v1/admin/officials/:authToken`
- **Get Official by serch**: `GET /api/v1/admin/official/:authToken`

### Chat Features *(Protected Routes)*

- **Access/Create One-on-One Chat**: `POST /api/v2/`
- **Fetch All Chats**: `GET /api/v2/`
- **Create Group Chat**: `POST /api/v2/group`
- **Rename Group Chat**: `PUT /api/v2/rename`
- **Add User to Group**: `PUT /api/v2/add`
- **Remove User from Group**: `PUT /api/v2/remove`

### Messages Features *(Protected Routes)*

- **Send a Message**: `POST /api/v3/`
- **Get All Messages in a Chat**: `/api/v3/:chatId `

