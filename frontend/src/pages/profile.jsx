// frontend/src/pages/profile.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const userId = id || (() => {
    try { return JSON.parse(localStorage.getItem('user')||'null')?._id; } catch(e){ return null; }
  })();

  useEffect(() => {
    if (!userId) return;
    api.get(`/users/${userId}`).then(res => setProfile(res.data.user)).catch(e => console.error(e));
    api.get(`/posts?user=${userId}`).then(res => setPosts(res.data)).catch(e => console.error(e));
  }, [userId]);

  if (!profile) return <div className="page"><div className="card">Loading profile...</div></div>;

  return (
    <div className="page">
      <div className="card">
        <h2>{profile.name}</h2>
        <div style={{ color: '#666' }}>{profile.email}</div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Posts</h3>
        {posts.map(p => <PostCard key={p._id} post={p} onUpdate={(u)=>setPosts(prev=>prev.map(x=>x._id===u._id?u:x))} onDelete={(id)=>setPosts(prev=>prev.filter(x=>x._id!==id))} />)}
      </div>
    </div>
  );
}
