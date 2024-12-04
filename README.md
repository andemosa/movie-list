Name: Anderson Osayerie | Email: osayerieanderson@gmail.com 

# Movie List Application

This is a sample full stack application built using React and Nodejs. The application allows users to create, edit, list and delete movies.

The project also includes a Swagger documentation.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [Setting Up](#setup)
- [Documentation](#api-documentation)
- [Author](#author)

## Overview

### The challenge

The task is to seamlessly integrate the provided [figma design](https://www.figma.com/design/GRba4s2OjAp72yH8OvwDN9/Movie-list?node-id=0-1&node-type=canvas&t=BL8tmN45ij3d3zY5-0), into a fully functional web application, demonstrating expertise in full stack web development and pixel-perfect implementation.

This Movie List Application should be web and mobile responsive

### Screenshot

![Desktop view - List of todos for a day](./screenshots/list.png)

###

![Desktop view - Show todo info](./screenshots/show.png)

###

![Desktop view - Update user info](./screenshots/update.png)

###

![Mobile view](./screenshots/mobile.jpg)

### Links

- Live Site URL: ()

## My process

### Built with

- TypeScript
- [React.js](https://react.dev/)
- [Tailwind](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/)
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/)

## Setup

This guide will walk you through the process of setting up the Movie List App on your local machine.

### Prerequisites

Before you begin, ensure you have Node.js installed on your system.

### Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/andemosa/movie-list.git
cd cytric
```

### Backend Configuration

1. **Environment Files**: Navigate to the `server` folder and create an `.env` file using the `.env.example` file.

2. **MongoDB Setup**:

   - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and follow the instructions to set up a new database.
   - Once set up, obtain your MongoDB connection string and add it to the `MONGODB_CONNECTION_STRING` variable in your `.env` files.

3. **JWT_SECRET_KEY**:
   - This just needs to be any long, random string. You can google "secret key generator".

### Frontend Configuration

1. **Environment Files**: Navigate to the `frontend` folder and create an `.env` file using the `.env.example` file.

2. **Cloudinary Setup**:

   - Create an account at [Cloudinary](https://cloudinary.com/).
   - Navigate to your settings and create a new preset.
   - Replace the placeholder `:cloud_name` with your username and `:action` with upload for the `VITE_UPLOAD_LINK`
   - Add your preset name as `VITE_UPLOAD_PRESET`.

3. **VITE_BASE_URLL**:
   - The `VITE_BASE_URL` should point to the URL where your backend application is running (typically `http://localhost:4000` if you're running it locally).

### Running the Application

1. **Backend**:

   - Navigate to the `server` directory.
   - Install dependencies: `yarn install`.
   - Start the server: `yarn dev`.

2. **Frontend**:
   - Open a new terminal and navigate to the `frontend` directory.
   - Install dependencies: `npm install`.
   - Start the frontend application: `npm run dev`.
   - The application should now be running on `http://localhost:5173` but verify this in your command line terminal

## API Documentation

The REST API exposes its OpenAPI. You can view the API definition interactively using the Swagger UI, hosted at /docs. Simply start the server and navigate to [http://127.0.0.1:4000/docs](http://127.0.0.1:4000/docs) in your browser to access the Swagger UI.

Alternatively, you can explore the [online version of the API documentation](https://andemosa.github.io/movie-list/) without running the server.

[![openapi](screenshots/swagger-docs.png)](https://andemosa.github.io/movie-list/)

## Author

- Anderson Osayerie - [@andemosa](https://andemosa.tech)
- Twitter - [@andemosa](https://www.twitter.com/andemosa)
