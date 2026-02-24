"use client";

import { useEffect, useRef } from "react";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import styles from "./kontak.module.css";

export default function KontakPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const el = pageRef.current;
      if (!el) return;

      // Title chars
      const titleChars = el.querySelectorAll(`.${styles.titleChar}`);
      gsap.fromTo(
        titleChars,
        { y: "120%", rotateX: -80, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.04,
          delay: 0.5,
          ease: "power4.out",
        }
      );

      // Subtitle
      const subtitle = el.querySelector(`.${styles.subtitle}`);
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, delay: 1, ease: "power2.out" }
      );

      // Form elements stagger
      const formItems = el.querySelectorAll(`.${styles.formGroup}`);
      gsap.fromTo(
        formItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          delay: 1.3,
          ease: "power3.out",
        }
      );

      // Submit button
      const submitBtn = el.querySelector(`.${styles.submit}`);
      gsap.fromTo(
        submitBtn,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power2.out" }
      );

      // Info section — blur in
      const infoItems = el.querySelectorAll(`.${styles.infoItem}`);
      gsap.fromTo(
        infoItems,
        { opacity: 0, x: -20, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          delay: 1.5,
          ease: "power3.out",
        }
      );
    };

    animate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageRef.current) {
      messageRef.current.textContent = "Pesan Anda telah dikirim. Terima kasih.";
      messageRef.current.style.opacity = "1";
    }
  };

  const titleChars = "KONTAK".split("").map((char, i) => (
    <span key={i} className={styles.titleCharWrap}>
      <span className={styles.titleChar}>{char}</span>
    </span>
  ));

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />

      <div ref={pageRef} className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{titleChars}</h1>
          <p className={styles.subtitle}>
            Hubungi kami untuk kunjungan, kolaborasi, atau sekadar berbagi
            keheningan.
          </p>
        </header>

        <div className={styles.layout}>
          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nama</label>
              <input
                type="text"
                className={styles.input}
                required
                aria-label="Nama"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                required
                aria-label="Email"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Pesan</label>
              <textarea
                className={styles.textarea}
                rows={4}
                required
                aria-label="Pesan"
              />
            </div>

            <button type="submit" className={styles.submit}>
              <span className={styles.submitText}>Kirim Pesan</span>
              <span className={styles.submitLine} />
            </button>

            <p ref={messageRef} className={styles.message} aria-live="polite" />
          </form>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Alamat</span>
              <p className={styles.infoValue}>
                Jl. Keheningan No. 1<br />
                Jakarta Selatan 12110
              </p>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Jam Operasional</span>
              <p className={styles.infoValue}>
                Selasa — Minggu<br />
                10:00 — 18:00
              </p>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <p className={styles.infoValue}>
                info@ruangkosong.museum
              </p>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Sosial Media</span>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <a href="#" className={styles.socialLink}>Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
