"use client";

import { useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";
import TextReveal from "@/components/animations/TextReveal";
import FadeSection from "@/components/animations/FadeSection";

/**
 * AboutSection
 * Museum philosophy with extreme whitespace.
 * Character-by-character reveal animation.
 * Minimal email subscribe form.
 */
export default function AboutSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const input = form.querySelector("input") as HTMLInputElement;
    const email = input?.value;

    if (!email || !email.includes("@")) {
      if (messageRef.current) {
        messageRef.current.textContent = "Masukkan email yang valid";
        messageRef.current.style.opacity = "1";
      }
      return;
    }

    if (messageRef.current) {
      messageRef.current.textContent = "Terima kasih";
      messageRef.current.style.opacity = "1";
    }
    input.value = "";
  };

  return (
    <section className={styles.section} id="tentang">
      <div className={styles.content}>
        <TextReveal
          text="TENTANG"
          tag="h2"
          className="text-section"
        />

        <div className={styles.philosophy}>
          <FadeSection>
            <p className={styles.body}>
              Museum Ruang Kosong percaya bahwa seni tidak selalu tentang apa
              yang terlihat. Terkadang, karya yang paling kuat adalah ruang
              kosong itu sendiri — keheningan di antara nada, jeda di antara
              kata, napas di antara gerakan.
            </p>
          </FadeSection>

          <FadeSection>
            <p className={styles.body}>
              Didirikan pada tahun 2020, museum ini menjadi rumah bagi
              seniman-seniman kontemporer yang mengeksplorasi batas antara
              kehadiran dan ketiadaan. Setiap ruang dirancang untuk memberikan
              karya seni ruang bernapas yang luas — sebuah pengalaman
              kontemplatif yang jarang ditemukan di dunia digital.
            </p>
          </FadeSection>
        </div>

        <FadeSection>
          <div className={styles.formArea} id="kontak">
            <p className={styles.formLabel}>Tetap terhubung</p>
            <form
              ref={formRef}
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                className={styles.input}
                placeholder="email"
                aria-label="Alamat email"
              />
              <button type="submit" className={styles.submit} aria-label="Kirim">
                →
              </button>
            </form>
            <p ref={messageRef} className={styles.message} aria-live="polite" />
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
