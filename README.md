# MyThinkBoard

A lightweight, fully responsive notes management application developed using MERN stack architecture. The project is split into two independent directories, FrontEnd and BackEnd to ensure clean separation of concerns and maintainability.

## Architectural Overview

### FrontEnd: 
This directory hosts a dynamic Single Page Application (SPA) built with React 19, Vite, and Tailwind CSS among other packages.
#### Tech Stack:
- Core: React 19, Vite, JavaScript (ES6+);

- Styling & UI: Tailwind CSS, DaisyUI, Lucide React Icons;

- Libraries: React Router, Axios, React Hot Toast, React Spinners;

### BackEnd: 
A RESTful API built with Node.js, Express.js, MongoDB, Upstash Redis. It follows a Model-View-Controller (MVC) design pattern, data modeling via Mongoose, and features Upstash's Redis API for rate-limiting as a means of protection from server-side abuse.
#### Tech Stack:
- Core: Node.js, Express.js;

- Database: MongoDB Atlas, Mongoose ESM;

- Security & Optimization: Upstash Redis (Rate-limiting), Dotenv;

## Getting started

### Prerequisites:

Ensure you have Node.js (v18+) and npm installed on your machine. You will also need a MongoDB Atlas account and an Upstash Redis database instance.

To launch the project, follow the steps below:

Assuming you haven't already downloaded the code for the project, paste the following command in your terminal:

git clone https://github.com/EAE00-src/My-ThinkBoard.git

cd My-ThinkBoard

### Install Dependencies:

Run this npm script/command to install all dependencies for both the Frontend and Backend simultaneously from the root directory (outside of both Frontend and Backend):

npm run install-all

### Environment Configuration:

To run the backend environment/localhost server, you'll need to create an .env file to securely store your own credentials. Afterwards your .env file should follow this structure:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
REDIS_URL=your_upstash_redis_rest_url
REDIS_TOKEN=your_upstash_redis_rest_token

### Running the project:

After all of the dependencies are installed and you've configured your .env variables appropriately, you should then open two terminal windows/tabs and move to each directory respectively.
One terminal window for Frontend and the other for Backend.
This is done using the following commands from the root directory:

cd Frontend

cd Backend

Afterwards, within each terminal you can run "npm run dev" to boot up each localhost server.
