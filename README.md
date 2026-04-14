# Coldtake

Coldtake is an online fashion publication where anyone can publish their opinion, no account, no followers, no industry connections needed. You write your take, you get a unique code, and that code is the only thing you need to edit or delete it later. Simple as that.

The idea came from a real frustration: fashion has a lot to say, but only lets certain people say it. Coldtake is for everyone else, dezentralising trends and making fashion about personal representtation again.

## The Idea

I built this as a university project, but the problem it's trying to solve is real. Fashion is one of the most personal forms of self-expression that exists — and yet the conversation around it is almost entirely controlled by a small group of people. Designers, editors, influencers. If you're not one of them, you consume. You don't contribute.

Coldtake is a small attempt to change that. No gatekeeping, no follower counts, no verification. Just the opinion, standing on its own.

## Features

- Publishing opinion pieces with a unique edit code system (no login required)
- Browsing and sorting all published takes by date or view count
- Editing and deleting your own articles using your personal access code
- A view counter that tracks how many times each article has been read
- Optional social handles on each article so readers can connect with the author

## Tech Stack

This project runs on Node.js and Express with EJS for server-side templating. MongoDB is used as the database with Mongoose as the ODM. Passwords and edit codes are hashed with bcryptjs. The frontend is plain HTML, CSS, and vanilla JavaScript (no frameworks).

## Getting Started

You will need Node.js and MongoDB Community Server installed on your machine.

Clone the repository and install dependencies:

```
npm install
```

Create a `.env` file in the root folder with the following:

```
MONGODB_URI=mongodb://localhost:27017/coldtake
PORT=3000
```

Make sure your MongoDB server is running:

```
mongod
```

Then start the development server:

```
npm run dev
```

The app will be running at `http://localhost:3000`.

## Directory Structure

`views/` contains all EJS templates for the pages and partials like the navbar and footer.

`routes/` contains the Express route files — `index.js` for the home page and `takes.js` for everything related to articles.

`models/` contains the Mongoose schema for articles.

`public/` contains static assets — CSS and client-side JavaScript.

`config/` contains the database connection setup.


## Deployment

The app is deployed on Railway. Environment variables are set directly in the Railway dashboard (the same keys as in the local `.env` file).


