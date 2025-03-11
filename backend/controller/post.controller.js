// A CORRIGER, TEMPORAIRE
// 

const Post = require('../models/Tweet'); // Assurez-vous d'avoir un modèle Post

// Créer un nouveau post
exports.createTweet = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new Tweet({ title, content, author: req.userId });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer tous les posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'email'); // Populate pour inclure les infos de l'auteur
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un post par son ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'email');
        if (!post) {
            return res.status(404).json({ message: 'Tweet non trouvé' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un post
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Tweet non trouvé' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Tweet non trouvé' });
        }
        res.status(200).json({ message: 'Tweet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};