import React from "react";
import "../../styles/ShopFooter.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="shop-footer">
      <div className="footer-content">
        {/* 🧸 Brand Info */}
        <div className="footer-section brand">
          <h2 className="footer-logo">BafnaToys 🧸</h2>
          <p className="footer-tagline">
            Where Fun Meets Imagination 🚀<br />
            Your one-stop toy destination for every age!
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/categories">Categories</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* 🛠️ Customer Support */}
        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul>
            <li>
              <a href="#">My Orders</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Return Policy</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* 🧾 Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <strong>BafnaToys</strong>. All Rights Reserved. |
          Built with ❤️ by <span className="dev-name">BAFNA</span>
        </p>
      </div>
    </footer>
  );
}
