// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';

import './index.css';

function TopBar() {
  let userName = 'Guest';
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.name) userName = user.name;
  } catch (e) {}
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">LinkedIn-Lite</Link>
        <nav className="topnav">
          <span className="username">Welcome, <strong>{userName}</strong></span>
          <Link to="/profile" className="profile-link">Profile</Link>
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
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id?" element={<Profile />} />
        </Routes>
      </main>
    </Router>
  );
}
