const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// Public: GET all posts
router.get('/', getAllPosts);

// Public: GET post by id
router.get('/:id', getPostById);

// Protected: create, update, delete
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
