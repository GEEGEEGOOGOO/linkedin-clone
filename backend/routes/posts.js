const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// Create a post (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if (!text && !imageUrl) {
      return res.status(400).json({ message: 'Post text or image required' });
    }
    const post = new Post({
      user: req.user._id,
      text: text || '',
      imageUrl: imageUrl || null,
    });
    await post.save();
    const populated = await Post.findById(post._id).populate('user', 'name email');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post by id (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name email')
      .populate('comments.user', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts by user id (public)
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'name email')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user's posts (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
      .populate('user', 'name email')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    if (typeof text !== 'undefined') post.text = text;
    if (typeof imageUrl !== 'undefined') post.imageUrl = imageUrl;
    await post.save();
    const populated = await Post.findById(post._id).populate('user', 'name email');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle like/unlike (protected)
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.some(
      (uid) => uid.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((uid) => uid.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    const populated = await Post.findById(post._id)
      .populate('user', 'name email')
      .populate('comments.user', 'name');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment (protected)
router.post('/comment/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.unshift({
      user: req.user._id,
      text,
    });

    await post.save();
    const populated = await Post.findById(post._id)
      .populate('user', 'name email')
      .populate('comments.user', 'name');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
