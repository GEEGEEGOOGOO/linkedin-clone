import { useState } from "react";
import api from "../utils/api";

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post("/api/posts", { text });
    setText("");
    onPostCreated();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        style={{ width: "100%", padding: 10 }}
      />
      <button type="submit">Post</button>
    </form>
  );
}
export default CreatePost;
