"use client";

import { useEffect, useRef } from "react";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import styles from "./tentang.module.css";

export default function TentangPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = pageRef.current;
      if (!el) return;

      // Title chars reveal
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

      // Decorative line
      const line = el.querySelector(`.${styles.decoLine}`);
      gsap.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, delay: 1.2, ease: "power3.inOut" }
      );

      // Content blocks — staggered blur-in on scroll
      const blocks = el.querySelectorAll(`.${styles.block}`);
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 60, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Stats counter animation
      const stats = el.querySelectorAll(`.${styles.statNumber}`);
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0", 10);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            stat.textContent = Math.floor(counter.val).toString();
          },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Quote — word by word reveal
      const quoteWords = el.querySelectorAll(`.${styles.quoteWord}`);
      gsap.fromTo(
        quoteWords,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.querySelector(`.${styles.quote}`),
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    };

    animate();
  }, []);

  const titleChars = "TENTANG".split("").map((char, i) => (
    <span key={i} className={styles.titleCharWrap}>
      <span className={styles.titleChar}>{char}</span>
    </span>
  ));

  const quoteText =
    "Seni terbaik adalah yang memberikan ruang bagi penikmatnya untuk bernafas, merenung, dan menemukan keindahan dalam ketiadaan.";
  const quoteWords = quoteText.split(" ");

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <ScrollProgress />

      <div ref={pageRef} className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{titleChars}</h1>
          <div className={styles.decoLine} />
        </header>

        <div className={styles.content}>
          <div className={styles.block}>
            <span className={styles.blockLabel}>Filosofi</span>
            <h2 className={styles.blockTitle}>Keheningan yang Berbicara</h2>
            <p className={styles.blockBody}>
              Museum Ruang Kosong didirikan dengan keyakinan bahwa seni tidak
              selalu harus memenuhi ruang. Justru dalam kekosongan itulah kita
              menemukan esensi yang paling murni. Setiap karya yang dipamerkan
              di sini diberikan ruang bernapas yang luas — sebuah penghormatan
              terhadap negative space sebagai elemen seni yang paling kuat.
            </p>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>Visi</span>
            <h2 className={styles.blockTitle}>Ruang untuk Merenung</h2>
            <p className={styles.blockBody}>
              Kami percaya bahwa pengalaman seni yang sejati membutuhkan
              keheningan. Di dunia yang semakin bising, Museum Ruang Kosong
              menjadi oasis kontemplatif — tempat di mana waktu melambat dan
              setiap momen berlapis dengan makna. Website ini dirancang untuk
              mencerminkan pengalaman tersebut dalam bentuk digital.
            </p>
          </div>

          <div className={styles.quote}>
            <p className={styles.quoteText}>
              &ldquo;
              {quoteWords.map((word, i) => (
                <span key={i} className={styles.quoteWord}>
                  {word}{" "}
                </span>
              ))}
              &rdquo;
            </p>
            <span className={styles.quoteAuthor}>— Aria Nusantara, Pendiri</span>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber} data-value="47">
                0
              </span>
              <span className={styles.statLabel}>Karya Dipamerkan</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} data-value="12">
                0
              </span>
              <span className={styles.statLabel}>Seniman Residen</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} data-value="4">
                0
              </span>
              <span className={styles.statLabel}>Tahun Beroperasi</span>
            </div>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>Lokasi</span>
            <h2 className={styles.blockTitle}>Ruang Fisik</h2>
            <p className={styles.blockBody}>
              Museum Ruang Kosong berlokasi di jantung kota Jakarta, menempati
              sebuah bangunan bekas gudang yang direstorasi. Arsitektur
              brutalisme beton yang mentah berpadu dengan interior minimalis
              menciptakan kontras yang sempurna — sebuah cangkang kokoh yang
              melindungi keheningan di dalamnya.
            </p>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
