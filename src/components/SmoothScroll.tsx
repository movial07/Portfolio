'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On touch/mobile devices, use native browser momentum scrolling for reliability & performance
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || window.innerWidth < 768);

    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      infinite: false,
    });

    lenis.on('scroll', (e: { progress: number }) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `translateY(${e.progress * 300}%)`;
      }
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      {/* SoHub-style Custom Smooth Scrollbar Track on Right Edge */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 h-[50vh] z-[1000] w-1 pointer-events-none hidden sm:block">
        <div className="h-full relative w-full bg-neutral-200/60 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full bg-black rounded-full transition-transform duration-100 ease-out"
            style={{
              height: '25%',
              transform: 'translateY(0%)',
            }}
          />
        </div>
      </div>
    </>
  );
}
