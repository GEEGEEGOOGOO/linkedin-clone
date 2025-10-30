// frontend/src/pages/profile.jsx
import React, { useEffect, useState } from "react";
import api from "../api"; // adjust path if needed

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // get token (wherever you store it) — localStorage example:
  const token = localStorage.getItem("token"); // or your storage key

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        // Option A: if you have endpoint to get current user from token:
        const res = await api.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data); // adjust based on response shape

        // Option B: if you only have /api/users/:id and have userId:
        // const userId = localStorage.getItem("userId");
        // const res = await api.get(`/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` }});

      } catch (err) {
        console.error("Profile load error:", err);
        // optionally set an error state to show user-friendly message
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  if (loading) return <div className="card">Loading profile...</div>;

  if (!user) return <div className="card">Unable to load profile.</div>;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* other profile fields */}
    </div>
  );
}

export default Profile;
