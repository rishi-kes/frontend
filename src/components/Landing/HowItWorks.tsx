import React from 'react';
import styles from '../../styles/pages/Landing.module.css';

const steps = [
  { num: 1, title: 'Sign Up', desc: 'Create your account & shop name.' },
  { num: 2, title: 'Choose Plan', desc: 'Start free trial or activate ₹199 plan.' },
  { num: 3, title: 'Launch', desc: 'Add products, set up domain, and go live!' },
];

export default function HowItWorks() {
  return (
    <section className={styles.how}>
      <h2>How It Works</h2>
      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.stepCircle}>{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
