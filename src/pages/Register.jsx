import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBasket, Leaf, ShieldCheck } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must contain at least 6 characters.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-welcome">
          <div className="login-brand">
            <ShoppingBasket size={30} />
            <span>GroceryGo</span>
          </div>

          <div className="welcome-content">
            <span className="welcome-tag">JOIN GROCERYGO</span>
            <h1>Fresh Choices. <span>Happy Living.</span></h1>
            <p>
              Create your account and discover fresh groceries
              and everyday essentials in one place.
            </p>

            <div className="welcome-features">
              <div>
                <Leaf size={21} />
                <span>Fresh Quality Products</span>
              </div>
              <div>
                <ShieldCheck size={21} />
                <span>Secure Account Creation</span>
              </div>
            </div>
          </div>

          <p className="welcome-footer">
            Fresh choices. Better living.
          </p>
        </div>

        <div className="login-form-section">
          <form className="login-card" onSubmit={handleRegister}>
            <span className="login-small-title">GET STARTED</span>
            <h2>Create Account</h2>
            <p className="login-description">
              Join GroceryGo and start shopping fresh.
            </p>

            {error && <p className="auth-error">{error}</p>}

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password (minimum 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create My Account →"}
            </button>

            <p className="login-register">
              Already have an account?
              <Link to="/login"> Sign In</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;