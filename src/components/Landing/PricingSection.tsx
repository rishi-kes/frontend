import React from 'react';
import styles from '../../styles/pages/Landing.module.css';

export default function PricingSection() {
  return (
    <section className={styles.pricing}>
      <h2>Simple, Transparent Pricing</h2>
      <div className={styles.pricingGrid}>
        <div className={styles.planCard}>
          <h3>Free Trial</h3>
          <p className={styles.price}>₹0 / 7 days</p>
          <ul>
            <li>7-day full access</li>
            <li>Custom Subdomain</li>
            <li>Unlimited edits</li>
          </ul>
          <a href="/signup" className={styles.primaryBtn}>Start Now</a>
        </div>

        <div className={`${styles.planCard} ${styles.highlight}`}>
          <h3>Basic</h3>
          <p className={styles.price}>₹199 / month</p>
          <ul>
            <li>Free Trial +</li>
            <li>Full Dashboard</li>
            <li>UPI/QR Billing</li>
            <li>Email Support</li>
          </ul>
          <a href="/signup" className={styles.primaryBtn}>Choose Plan</a>
        </div>

        {/* Premium Plan - Now with specific class for enhanced styling */}
        <div className={`${styles.planCard} ${styles.premiumPlanCard}`}>
          <h3>Premium</h3>
          <p className={styles.price}>₹499 / month</p>
          <ul>
            <li>Everything in Basic</li>
            <li>Custom Domain</li>
            <li>Priority Support</li>
            <li>Advanced Analytics</li>
          </ul>
          <a href="/signup" className={styles.primaryBtn}>Upgrade</a>
        </div>
      </div>
    </section>
  );
}