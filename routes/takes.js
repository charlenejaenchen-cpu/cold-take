// --- DEPENDENCIES ---
import express from 'express';
const router = express.Router();


// --- ROUTES ---

// .get
router.get('/', (req, res) =>{
    res.render('takes');
});

export default router;