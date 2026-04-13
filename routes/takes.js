// --- DEPENDENCIES ---
import express from 'express';
const router = express.Router();


// --- ROUTES ---

// GET

// Takes Index
router.get('/', (req, res) =>{
    res.render('takes');
});

// Publish Form
router.get('/state-it', (req, res) => {
  res.render('state-it');
});

// Single Article
router.get('/:slug', (req, res) => {
  res.render('article');
});


export default router;