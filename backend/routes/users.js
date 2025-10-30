// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// Get a user's profile info (public)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    // optionally include user's posts count
    const postsCount = await Post.countDocuments({ user: user._id });
    res.json({ user, postsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
