import express from 'express';
import { createPost, getPosts } from '../controller/post.controller.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);

export default router;
