import React from 'react';
import styles from '../../styles/pages/Landing.module.css';

const features = [
  {
    title: 'Launch Fast',
    desc: 'Get your shop ready in minutes with our beautiful templates.',
    icon: '⚡',
  },
  {
    title: 'Sell Securely',
    desc: 'Accept UPI QR payments with auto billing & SSL security.',
    icon: '🔒',
  },
  {
    title: 'Scale Easily',
    desc: 'Add products, connect a custom domain, and grow limitlessly.',
    icon: '📈',
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.features}>
      <h2>Why Choose Us?</h2>
      <div className={styles.featureGrid}>
        {features.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
