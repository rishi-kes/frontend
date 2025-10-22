import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { email, password } = form;

    if (!email || !password) {
      return setError("All fields are required.");
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        // ✅ Save login info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userName", res.data.user.firstName || "");

        // ✅ Redirect to Dashboard
        window.location.href = "/dashboard";
      } else {
        setError(res.data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
            alt="logo"
          />
          <h2>StoreBuilder</h2>
        </div>

        <h1>Welcome back 👋</h1>
        <p className={styles.subtitle}>
          Log in to manage your website and continue building your brand.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Sign in</h3>
          <p className={styles.subnote}>
            Enter your login details to access your dashboard.
          </p>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
            <span
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>

          <p className={styles.signupText}>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        <h1>Power your online store effortlessly</h1>
        <p>
          Manage orders, products, and your website — all in one place. Designed
          to make your business grow faster 🚀
        </p>

        <ul className={styles.features}>
          <li>✅ Easy Dashboard Access</li>
          <li>✅ Real-time Order Tracking</li>
          <li>✅ UPI QR Billing Integration</li>
        </ul>

        <blockquote className={styles.testimonial}>
          “The StoreBuilder dashboard made everything so easy to manage!”
          <br />
          <span>— Aarav M., Small Business Owner</span>
        </blockquote>
      </div>
    </div>
  );
}
