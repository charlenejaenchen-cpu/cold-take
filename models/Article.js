import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    authorName: { type: String, required: true },
    socials: { type: String },
    editCodeHash: { type: String, required: true },
    viewCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Article', articleSchema);