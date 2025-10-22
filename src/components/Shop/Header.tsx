import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import styles from "../../styles/components/Header.module.css";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [cartCount, setCartCount] = useState(1);
  const [storeName] = useState("BafnaToys");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    const root = document.documentElement;

    if (storedMode === "dark") {
      root.classList.add("dark");
      setDarkMode(true);
    } else {
      root.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className={styles.header}>
      {/* Left Section */}
      <div className={styles.left}>
        <div className={styles.logoSection}>
          <img src="/logo.png" alt="logo" className={styles.logo} />
          <span className={styles.name}>{storeName}</span>
        </div>
      </div>

      {/* Center Search */}
      <div className={styles.searchBar} tabIndex={0}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search toys..." />
      </div>

      {/* Right Actions */}
      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Wishlist">
          <FaHeart />
          {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
        </button>

        <button className={`${styles.iconBtn} ${styles.cartBtn}`} aria-label="Cart">
          <FaShoppingCart />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>

        <button className={styles.iconBtn} aria-label="User Profile">
          <FaUser />
        </button>

        <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle Theme">
          {darkMode ? <FaSun className={styles.themeIcon} /> : <FaMoon className={styles.themeIcon} />}
        </button>
      </div>
    </header>
  );
}
