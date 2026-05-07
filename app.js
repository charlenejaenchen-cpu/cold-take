// --- DEPENDENCIES ---

// Imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Router
import indexRouter from './routes/index.js';
import takesRouter from './routes/takes.js';
import stateItRouter from './routes/stateIt.js';

// __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// --- APP SETUP ---
const app = express();


// --- VIEW ENGINE ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// --- MIDDLEWARE ---
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// --- ROUTES ---
app.use('/', indexRouter);
app.use('/takes', takesRouter);
app.use('/state-it', stateItRouter)


// --- EXPORT ---
export default app;


