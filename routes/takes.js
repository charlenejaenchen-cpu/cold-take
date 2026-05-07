// routes/takes.js

import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();


// --- ROUTES ---

// GET Takes Index
router.get('/', async (req, res) => {
    const article = await Article.find().sort({ publishedAt: -1 });
    res.render('takes', { article });
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