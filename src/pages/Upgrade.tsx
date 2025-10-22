import React from "react";
import styles from "../styles/pages/Upgrade.module.css";

export default function Upgrade() {
  return (
    <div className={styles.upgradeWrapper}>
      <div className={styles.card}>
        <h1>🚫 Trial Ended</h1>
        <p className={styles.subtitle}>
          Your 7-day free trial has expired. Continue building your store by
          upgrading your plan for just <strong>₹199/month</strong>.
        </p>

        <div className={styles.qrBox}>
          <img
            src="/qr/phonepe.webp"
            alt="PhonePe QR"
            className={styles.qrImage}
          />
          <p>📱 Scan & Pay using PhonePe</p>
          <p className={styles.owner}>HRUSHI KESH PRADHAN</p>
        </div>

        <div className={styles.instructions}>
          <ul>
            <li>✅ Open PhonePe or any UPI app</li>
            <li>✅ Scan the QR code</li>
            <li>✅ Pay ₹199</li>
            <li>✅ Your plan will be activated within a few minutes</li>
          </ul>
        </div>

        <button
          className={styles.confirmBtn}
          onClick={() => alert("Payment verification coming soon 🚀")}
        >
          I’ve Paid ₹199 →
        </button>

        <p className={styles.note}>
          Need help? <a href="mailto:support@storebuilder.in">Contact support</a>
        </p>
      </div>
    </div>
  );
}
