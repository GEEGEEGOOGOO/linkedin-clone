// frontend/src/components/PostCard.jsx
import React, { useState } from 'react';
import api from '../api';

export default function PostCard({ post, onUpdate, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.text || '');

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch(e){ return null; }
  })();
  const token = localStorage.getItem('token');

  const isOwner = user && post.user && (post.user._id ? post.user._id === user._id : post.user === user._id);

  const toggleLike = async () => {
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      onUpdate && onUpdate(res.data);
    } catch (err) { console.error(err); }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await api.post(`/posts/${post._id}/comment`, { text: commentText });
      setCommentText('');
      onUpdate && onUpdate(res.data);
      setShowComments(true);
    } catch (err) { console.error(err); alert('Failed to post comment'); }
  };

  const handleEdit = async () => {
    try {
      const res = await api.put(`/posts/${post._id}`, { text: editText });
      setEditing(false);
      onUpdate && onUpdate(res.data);
    } catch (err) { console.error(err); alert('Edit failed'); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${post._id}`);
      onDelete && onDelete(post._id);
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{post.user?.name || 'Unknown'}</div>
              <div style={{ color: '#666', fontSize: 13 }}>{new Date(post.createdAt).toLocaleString()}</div>
            </div>
            {isOwner && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" onClick={() => { setEditing(!editing); setEditText(post.text); }}>
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                <button className="btn" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>

          {editing ? (
            <div style={{ marginTop: 8 }}>
              <textarea value={editText} onChange={(e)=>setEditText(e.target.value)} rows={3} style={{ width: '100%', padding: 8 }} />
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-primary" onClick={handleEdit}>Save</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 12 }}>{post.text}</div>
              {post.imageUrl && <div style={{ marginTop: 8 }}><img src={post.imageUrl} alt="" style={{ maxWidth: '100%', borderRadius: 6 }} /></div>}
            </>
          )}

          <div className="post-actions">
            <button className="btn" onClick={toggleLike}>
              {post.likes && post.likes.some(l => (typeof l === 'object' ? l._id : l) === user?._id) ? 'Unlike' : 'Like'}
            </button>
            <div className="like-count">{post.likes ? post.likes.length : 0} likes</div>

            <button className="btn" onClick={() => setShowComments(s => !s)}>{showComments ? 'Hide' : 'Comments'}</button>
            <div style={{ marginLeft: 'auto', color: '#999', fontSize: 13 }}>{/* placeholder */}</div>
          </div>

          {showComments && (
            <div className="comment-list">
              {post.comments && post.comments.length === 0 && <div style={{ color: '#666' }}>No comments</div>}
              {post.comments && post.comments.map(c => (
                <div key={c._id || Math.random()} className="comment-item">
                  <div style={{ fontWeight: 600 }}>{c.user?.name || c.user}</div>
                  <div>{c.text}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{new Date(c.createdAt).toLocaleString()}</div>
                </div>
              ))}
              <form onSubmit={submitComment} style={{ marginTop: 8 }}>
                <input type="text" value={commentText} onChange={(e)=>setCommentText(e.target.value)} placeholder="Write a comment" style={{ width: '75%', padding: 8 }} />
                <button className="btn" type="submit" style={{ marginLeft: 8 }}>Post</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
