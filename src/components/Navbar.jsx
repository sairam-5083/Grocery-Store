import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        🛒 GroceryGo
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>

        <a href="/#categories" onClick={closeMenu}>Categories</a>

        <NavLink to="/orders" onClick={closeMenu}>My Orders</NavLink>

        <NavLink to="/cart" onClick={closeMenu}>
          🛒 Cart ({cartCount})
        </NavLink>

        {user ? (
          <div className="profile-container">
            <button
              className="profile-dp"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Open profile menu"
            >
              {initial}
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <p>{user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;