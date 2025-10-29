function PostCard({ post }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
      }}
    >
      <h4>{post.user?.name}</h4>
      <p>{post.text}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
}
export default PostCard;
