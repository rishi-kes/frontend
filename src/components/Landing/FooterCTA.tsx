import React from 'react';
import styles from '../../styles/pages/Landing.module.css';

export default function FooterCTA() {
  return (
    <footer className={styles.footer}>
      <h2>Start Your Free Trial Today</h2>
      <p>Build your dream store and start selling instantly!</p>
      <a href="/signup" className={styles.primaryBtn}>Create My Store</a>
      <p className={styles.copy}>© 2025 BafnaSaaS. All rights reserved.</p>
    </footer>
  );
}
