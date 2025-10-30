// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';

function TopBar() {
  let userName = null;
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.name) userName = user.name;
  } catch (e) {
    userName = null;
  }

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // navigate to login page
    window.location.href = '/login';
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">LinkedIn-Lite</Link>
        <nav className="topnav">
          {token || userName ? (
            <>
              <span className="username">Welcome, <strong>{userName || 'User'}</strong></span>
              <Link to="/feed" className="nav-link">Feed</Link>
              <Link to="/profile" className="profile-link">Profile</Link>
              <button onClick={handleLogout} style={{ marginLeft: '12px' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link" style={{ marginLeft: '12px' }}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <Router>
      <TopBar />
      <main className="page">
        <Routes>
          {/* default root -> redirect to login (will redirect to feed automatically if logged in) */}
          <Route path="/" element={
            localStorage.getItem('token') || localStorage.getItem('user')
              ? <Navigate to="/feed" replace />
              : <Navigate to="/login" replace />
          }/>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes */}
          <Route path="/feed" element={
            <ProtectedRoute><Feed /></ProtectedRoute>
          } />
          <Route path="/profile/:id?" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}
