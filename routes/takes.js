// --- DEPENDENCIES ---
import express from 'express';
import Article from '../models/Article.js';
import bcrypt from 'bcryptjs';

const router = express.Router();


// --- ROUTES ---

// GET Takes Index
router.get('/', async (req, res) => {
    const article = await Article.find().sort({ publishedAt: -1});
    res.render('takes', { article });
});

// POST Take Publish 
router.post('/state-it', async (req, res) => {
    const { title, body, authorName, socials } = req.body;
    console.log(req.body);
    
    // Slug generieren
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
   
    // Edit Code generieren und hashen
    const editCode = Math.random().toString(36).substring(2, 10);
    const editCodeHash = await bcrypt.hash(editCode, 10);
    
    // Artikel in DB speichern
    const article = new Article({ title, slug, body, authorName, socials, editCodeHash });
    await article.save();
   
    // Confirmation Page mit Edit Code anzeigen
    res.render('state-it', { state: 'success', editCode, article });
});


// GET State it
router.get('/state-it', (req, res) => {
    res.render('state-it');
});

// GET Single Article
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });

    if (!article) {
        return res.status(404).send('Article not found');
    }

    article.viewCount += 1;
    await article.save();

    res.render('article', { article });
});


export default router;