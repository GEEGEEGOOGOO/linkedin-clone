// frontend/src/components/CreatePost.jsx
import React, { useState } from 'react';
import api from '../api';

export default function CreatePost({ onPosted }) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await api.post('/posts', { text, imageUrl: imageUrl || undefined });
      onPosted && onPosted(res.data);
      setText('');
      setImageUrl('');
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: 8 }}
        />
        <input
          type="text"
          placeholder="Optional image URL"
          value={imageUrl}
          onChange={(e)=>setImageUrl(e.target.value)}
          style={{ width: '100%', marginTop: 8, padding: 8 }}
        />
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-primary" type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
