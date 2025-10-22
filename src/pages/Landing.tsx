import React from 'react';
import HeroSection from '../components/Landing/HeroSection';
import FeaturesSection from '../components/Landing/FeaturesSection';
import PricingSection from '../components/Landing/PricingSection';
import HowItWorks from '../components/Landing/HowItWorks';
import DemoSection from '../components/Landing/DemoSection';
import FAQSection from '../components/Landing/FAQSection';
import FooterCTA from '../components/Landing/FooterCTA';
import styles from '../styles/pages/Landing.module.css';
import useScrollReveal from "../utils/useScrollReveal";

export default function Landing() {
  useScrollReveal(); // 👈 activate scroll animation logic

  return (
    <div className={styles.landingPage}>
      <HeroSection />
      <div className="reveal"><FeaturesSection /></div>
      <div className="reveal delay-1"><PricingSection /></div>
      <div className="reveal delay-2"><HowItWorks /></div>
      <div className="reveal delay-3"><DemoSection /></div>
      <div className="reveal delay-4"><FAQSection /></div>
      <FooterCTA />
    </div>
  );
}
