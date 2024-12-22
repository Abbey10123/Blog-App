# Blog Application

This is a blog application that allows users to create, view, and manage blog posts. The app provides an API for interacting with the blog, including creating blog posts, viewing individual posts, and tracking post views.

## Features

- **Create Blog Post**: Users can create blog posts by providing a title, description, tags, and body content.
- **View Blog Post**: Users can view a specific blog post, and the `read_count` is incremented every time the post is viewed.
- **JWT Authentication**: The application uses JSON Web Tokens (JWT) to authenticate users.
- **Database**: MongoDB is used as the database for storing blog posts and user data.

## Technologies Used

- **Node.js**: JavaScript runtime used for server-side logic.
- **Express**: Web framework for Node.js used to build the API.
- **MongoDB**: NoSQL database to store data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens used for user authentication and authorization.
- **Supertest**: HTTP assertions for testing the API.
- **Jest**: Testing framework for running unit and integration tests.
