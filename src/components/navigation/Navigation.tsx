"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

/**
 * Floating Navigation Bar
 * Always visible, glass-morphism style.
 * Links to all pages. Active state indicator.
 * Entrance animation on page load.
 */
export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animateIn = async () => {
      const { gsap } = await import("gsap");
      if (!navRef.current) return;

      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 4, // After preloader
        }
      );

      // Stagger nav links
      const links = navRef.current.querySelectorAll(`.${styles.link}`);
      gsap.fromTo(
        links,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 4.3,
        }
      );
    };

    animateIn();
  }, []);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/pameran", label: "Pameran" },
    { href: "/tentang", label: "Tentang" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
      aria-label="Menu utama"
      style={{ opacity: 0 }}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>MRK</span>
          <span className={styles.logoDot} />
        </Link>

        <div className={styles.links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ""
                }`}
            >
              <span className={styles.linkText}>{link.label}</span>
              <span className={styles.linkLine} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
