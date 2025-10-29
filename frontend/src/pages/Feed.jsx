import { useEffect, useState } from "react";
import api from "../utils/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { logout, getUser } from "../utils/auth";

function Feed() {
  const [posts, setPosts] = useState([]);
  const user = getUser();

  const loadPosts = async () => {
    const res = await api.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Welcome, {user?.name}</h3>
        <button onClick={logout}>Logout</button>
      </div>
      <CreatePost onPostCreated={loadPosts} />
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}
export default Feed;
