import React from "react";
import styles from "../../styles/pages/Landing.module.css";
import heroImage from "../../assets/hero.png";
import bgWaves from "../../assets/Hero_section_background_pattern.png";

export default function HeroSection() {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(135deg, #6a11cb 0%, #2575fc 100%), url(${bgWaves})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className={styles.heroRow}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTagLine}>
            <span>Launch your website in minutes</span>
          </div>
          <h1 className={styles.heroTitle}>Create your<br />professional website<br />in minutes</h1>
          <p className={styles.heroDesc}>
            Build a stunning website with automatic subdomain, beautiful themes, and powerful features. No coding required.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/signup" className={styles.primaryBtn}>Start your website</a>
            <a href="/demo" className={styles.secondaryBtn}>View demo</a>
          </div>
          <div className={styles.heroTags}>
            <span>7 days free trial</span>
            <span>No payment required</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImageCard}>
            <img src={heroImage} alt="Hero Banner" />
          </div>
        </div>
      </div>
    </section>
  );
}
