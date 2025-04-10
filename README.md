# CivicLink

CivicLink is a collaborative platform aimed at improving civic engagement through technology. This repository contains the source code for the project.


## Features


## Technologies Used

- **Express.js** for building the API.
- **MongoDB** for storing notes and user data.
- **Mongoose** for object modeling and schema definition.
- **TypeScript** for type safety and better maintainability.

## Setup

### Prerequisites

- Node.js (preferably the latest stable version)
- MongoDB (or access to a MongoDB database)

### Installation

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ekhosuehip/CivicLink.git
   cd CivicLink

2. Push to the repository:

   ```bash
   git status
   git add .
   git commit -m "commit message"
   git checkout -b name_branch #only the first time you are pushing
   git push origin HEAD

3. Pull from the repository:

   ```bash
   git pull origin main

## API Endpoints

Base URL: /api/v1

GET /api/ping - A simple endpoint to check if the server is running.

Register Citizen
POST /api/v1/register/citizen

Register Official
POST /api/v1/register/official

Login
POST /api/v1/login
