# Code-Challenge-3

# Simple Blog/Post Manager

A simple blog post management application that allows users to view, create, edit, and delete blog posts. The application features a clean interface with a post list on the left and post details on the right, along with a form for adding new posts.

## Features
- View Posts: See all blog post titles in a list

- Post Details: Click on any post to view its full content and author information

- Create Posts: Add new blog posts with title, content, and author

- Edit Posts: Update existing posts with new titles and content

- Delete Posts: Remove posts you no longer want

- Persistent Data: All changes are saved to a mock backend API

## Technologies Used
- HTML

- CSS

- JavaScript

- JSON Server - Mock REST API

- Fetch API - For making HTTP requests



## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/blog-post-manager.git
cd blog-post-manager
```

2. Install JSON Server globally:

```
npm install -g json-server@0.17.4
```

3. Start the JSON Server (in one terminal window):

```
json-server --watch db.json
```

4. Open the application in your browser:

You can use a live server extension in VS Code

Or simply open the index.html file directly in your browser

## Project Structure
```
blog-post-manager/
├── index.html          # Main HTML file
├── src/
│   └── index.js       # Main JavaScript file
├── css/
│   └── styles.css     # Stylesheet
├── db.json            # Database file for JSON Server
└── README.md          # This file
```

## API Endpoints
The application uses the following endpoints from the JSON Server:

- GET /posts - Retrieve all blog posts

- GET /posts/:id - Retrieve a single blog post

- POST /posts - Create a new blog post

- PATCH /posts/:id - Update an existing blog post

- DELETE /posts/:id - Delete a blog post

## Usage Guide

### Viewing Posts:

- When the page loads, all posts will be displayed in the left panel

- Click on any post to view its details in the right panel

### Creating a Post:

- Fill out the form at the bottom of the page

- Click "Create Post" to add your new post

- The new post will appear in the list immediately

### Editing a Post:

- View the post you want to edit

- Click the "Edit" button

- Make your changes in the edit form that appears

- Click "Update Post" to save your changes

### Deleting a Post:

- View the post you want to delete

- Click the "Delete" button

- Confirm the deletion (the post will be removed immediately)