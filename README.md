# Getting Started with a GraphQL Project Management App

## Available Scripts

In the project directory, you can run:

### `npm run setup`

Installs all the dependencies for both frontend and backend

### `npm start`

Runs the app in the development mode in your default browser on http://localhost:3000.

The page will reload when you make changes.

### `npm run serve`

Starts up the server in watch mode on http://localhost:5000

The app will reload when you make changes.\
You may also see logs and errors in the console.

## Project Setup:

### You need:

- Database (MySQL)

### Create .env file

Create a .env file, following the structure of `.env.example` file, to store your credentials. Example below:

```
PORT = Optional, defaults to 5000
DB_USERNAME = Your MySQL User Name
DB_PASS = Your MySQL User Password
DB_NAME = The name of Your Collection
```

## Installation

To install and run this project - install dependencies using npm and then start your server:

```
$ npm run setup
```

After you've installed the dependencies, run

```
$ npm run serve
```

to start the server in watch mode, then open a new terminal window and run

```
$ npm start
```

And the application will open.
