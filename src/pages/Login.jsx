import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBasket, Leaf, ShieldCheck } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError("Login failed. Please check your email and password.");
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
            <span className="welcome-tag">FRESHNESS STARTS HERE</span>
            <h1>Welcome Back to <span>Fresh Living.</span></h1>
            <p>
              Your daily essentials, fresh groceries and healthy
              choices are just one step away.
            </p>

            <div className="welcome-features">
              <div>
                <Leaf size={21} />
                <span>Fresh Quality Products</span>
              </div>
              <div>
                <ShieldCheck size={21} />
                <span>Secure Account Login</span>
              </div>
            </div>
          </div>

          <p className="welcome-footer">
            Fresh choices. Better living.
          </p>
        </div>

        <div className="login-form-section">
          <form className="login-card" onSubmit={handleLogin}>
            <span className="login-small-title">YOUR ACCOUNT</span>
            <h2>Sign In</h2>
            <p className="login-description">
              Enter your details to continue shopping.
            </p>

            {error && <p className="auth-error">{error}</p>}

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Login to GroceryGo →"}
            </button>

            <p className="login-register">
              Don't have an account?
              <Link to="/register"> Create Account</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;