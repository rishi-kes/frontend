import React from "react";
import styles from "../../styles/pages/Landing.module.css";
import demoPreview from "../../assets/demo-preview.png"; // ✅ Correct import

export default function DemoSection() {
  return (
    <section className={styles.demo}>
      <div className={styles.demoContent}>
        <h2 className={styles.heading}>🚀 See It In Action</h2>
        <p className={styles.subtext}>
          Experience the live demo and explore how your dashboard will look before you sign up.
        </p>

        <div className={styles.imageWrapper}>
          <img
            src={demoPreview}
            alt="Demo Shop Preview"
            className={styles.demoImg}
          />
        </div>

        <a href="/demo" className={styles.primaryBtn}>
          Open Live Demo
        </a>
      </div>
    </section>
  );
}
