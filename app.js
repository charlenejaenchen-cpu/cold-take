// --- DEPENDENCIES ---

// Imports
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import indexRouter from './routes/index.js';

// __dirname in ESM
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// .env 
dotenv.config();

// Database Connection
connectDB();

// Server Connection
const app = express();
const PORT = process.env.PORT || 3000;


// --- VIEW ENGINE ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// --- MIDDLEWARE ---
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// --- ROUTES ---
app.use('/', indexRouter);


// --- SERVER CONNECTION ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

