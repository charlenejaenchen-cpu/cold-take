// --- DEPENDENCIES ---
import express from 'express';
import Article from '../models/Article.js';
import bcrypt from 'bcryptjs';

const router = express.Router();


// --- ROUTES ---

// GET Takes Index
router.get('/', async (req, res) => {
    const article = await Article.find().sort({ publishedAt: -1 });
    res.render('takes', { article });
});


// GET State It
router.get('/state-it', (req, res) => {
    res.render('state-it', { publishState: 'form', editState: 'code' });
});

// POST Take Publish 
router.post('/state-it', async (req, res) => {
    const { title, body, authorName, socials } = req.body;
    console.log(req.body);

    // Slug generieren
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Edit Code generieren und hashen (gegoogelt & mithilfe von KI herausgefunden)
    const editCode = Math.random().toString(36).substring(2, 10);
    const editCodeHash = await bcrypt.hash(editCode, 10);

    // Artikel in DB speichern
    const article = new Article({ title, slug, body, authorName, socials, editCodeHash });
    await article.save();

    // Confirmation Page mit Edit Code anzeigen
    res.render('state-it', { publishState: 'success', editState: 'code', editCode, article });
});

// POST Take Edit Verification
router.post('/edit/verify', async (req, res) => {
    const { editCode } = req.body;

    const articles = await Article.find({});

    let matchedArticle = null;

    // code comparisson
    for (const article of articles) {
        const codeMatch = await bcrypt.compare(editCode, article.editCodeHash);
        if (codeMatch) {
            matchedArticle = article;
            break;
        }
    }

    // case: code wrong
    if (!matchedArticle) {
        return res.render('state-it', { publishState: 'form', editState: 'code-error' });
    }

    // case: code correct
    res.render('state-it', { publishState: 'form', editState: 'choice', article: matchedArticle });
});

// POST Take Edit or Delete Choice
router.post('/edit/:id' , async (req, res) => {
    const { action } = req.body;
    const article = await Article.findById(req.params.id);

    if (action === 'edit') {
        res.render('state-it', { publishState: 'form', editState: 'form', article });
    } else if (action === 'delete') {
        res.render('state-it', { publishState: 'form', editState: 'delete-confirm', article });
    }
})

// POST Take Edit Form
router.post('/edit/:id/update' , async (req, res) => {
    const { title, body, socials } = req.body;
    console.log(req.body);

    await Article.findByIdAndUpdate(req.params.id, { title, body, socials });

    res.render('state-it', { publishState: 'form', editState: 'edit-success' });
})

// POST Take Delete Confirmation
router.post('/delete/:id' , async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);

    res.render('state-it', { publishState: 'form', editState: 'delete-success' });
})


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