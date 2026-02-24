"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * SmoothScroll Provider
 * Wraps the entire app with Lenis smooth scrolling.
 * Integrates with GSAP ScrollTrigger for animation triggers.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    let gsapModule: typeof import("gsap") | null = null;
    let scrollTriggerModule: typeof import("gsap/ScrollTrigger") | null = null;

    const initGSAP = async () => {
      gsapModule = await import("gsap");
      scrollTriggerModule = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      lenis.on("scroll", scrollTriggerModule.ScrollTrigger.update);

      gsapModule.gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsapModule.gsap.ticker.lagSmoothing(0);
    };

    initGSAP();

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
