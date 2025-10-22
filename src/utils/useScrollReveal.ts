import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 100; // distance from bottom of screen to trigger

      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // trigger once on mount

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);
}
