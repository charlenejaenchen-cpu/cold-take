// --- DEPENDENCIES ---
import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();


// --- ROUTES ---

// GET Landingpage
router.get('/', async (req, res) => {
    const article = await Article.find().sort({ viewCount: -1}).limit(10);
    res.render('index', { article });
});

export default router;