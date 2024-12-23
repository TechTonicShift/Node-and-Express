const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    // req.user was set in authMiddleware.js
    const { userId } = req.user; 
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: 'Title and content are required' });
    }

    const post = new Post({
      title,
      content,
      user: userId,
    });

    await post.save();
    res.status(201).json({ msg: 'Post created', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // Populate the user field if you want user info
    const posts = await Post.find().populate('user', 'email');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'email');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Only allow the owner of the post to edit
    if (post.user.toString() !== userId) {
      return res.status(403).json({ msg: 'Not authorized to update this post' });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.json({ msg: 'Post updated', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Only allow the owner of the post to delete
    if (post.user.toString() !== userId) {
      return res.status(403).json({ msg: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
