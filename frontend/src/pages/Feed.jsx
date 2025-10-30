// frontend/src/pages/Feed.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load posts');
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePosted = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts(prev => prev.map(p => (p._id === updatedPost._id ? updatedPost : p)));
  };

  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div>
      <CreatePost onPosted={handlePosted} />
      <div style={{ marginTop: 12 }}>
        {posts.map(p => (
          <PostCard key={p._id} post={p} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
