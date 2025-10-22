import React, { useState } from "react";
import styles from "../styles/pages/Signup.module.css";
import axios from "axios";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    websiteName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { websiteName, firstName, lastName, email, password, confirmPassword } = form;

    if (!websiteName || !firstName || !lastName || !email || !password || !confirmPassword)
      return setError("Please fill out all fields.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (password.length < 6) return setError("Password must be at least 6 characters long.");

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        websiteName,
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data.success) {
        alert("🎉 Account created successfully! Redirecting...");
        window.location.href = "/login";
      } else {
        setError(res.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupWrapper}>
      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                alt="StoreBuilder Logo"
              />
            </div>
            <h2>StoreBuilder</h2>
          </div>

          <div className={styles.header}>
            <h1>Create your website</h1>
            <p className={styles.subtitle}>
              Start your 7-day free trial. No payment required.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h3>Create Account</h3>
              <p className={styles.subnote}>Enter your details to get started</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="websiteName">Website Name</label>
                <input
                  id="websiteName"
                  type="text"
                  name="websiteName"
                  placeholder="my-awesome-store"
                  value={form.websiteName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Rishi"
                  value={form.firstName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Bafna"
                  value={form.lastName}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordField}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.passwordField}>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                "Create Account →"
              )}
            </button>

            <div className={styles.trial}>
              <span>✨ 7 days free trial included · No payment required</span>
            </div>

            <p className={styles.signinText}>
              Already have an account? <a href="/login" className={styles.signinLink}>Sign in</a>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        <div className={styles.rightContent}>
          <div className={styles.rightHeader}>
            <h1>Launch your website in minutes</h1>
            <p>
              Join thousands of entrepreneurs who have created stunning websites
              with <strong>StoreBuilder</strong>.
            </p>
          </div>

          <ul className={styles.features}>
            <li>
              <span className={styles.featureIcon}>🚀</span>
              <div>
                <strong>Instant Website Setup</strong>
                <span>Get online in under 10 minutes</span>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon}>🎨</span>
              <div>
                <strong>Beautiful Themes</strong>
                <span>Professional designs for every industry</span>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon}>💳</span>
              <div>
                <strong>UPI & Card Payments</strong>
                <span>Accept payments seamlessly</span>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon}>📱</span>
              <div>
                <strong>Mobile Optimized</strong>
                <span>Perfect experience on all devices</span>
              </div>
            </li>
          </ul>

          <blockquote className={styles.testimonial}>
            <div className={styles.quoteIcon}>❝</div>
            <p>
              "StoreBuilder made it incredibly easy to launch my website. I was up
              and running in less than 10 minutes!"
            </p>
            <footer>
              <strong>Priya S.</strong>
              <span>Fashion Entrepreneur</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}