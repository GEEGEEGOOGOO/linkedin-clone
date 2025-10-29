import { getUser, logout } from "../utils/auth";

function Navbar() {
  const user = getUser();
  return (
    <nav
      style={{
        background: "#f3f3f3",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>LinkedIn Clone</h3>
      {user && (
        <div>
          <span>{user.name}</span>
          <button style={{ marginLeft: 10 }} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
