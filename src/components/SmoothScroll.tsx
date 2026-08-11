'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(e.progress);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
            className="w-full bg-black rounded-full transition-transform duration-100 ease-out"
            style={{
              height: '25%',
              transform: `translateY(${scrollProgress * 300}%)`,
            }}
          />
        </div>
      </div>
    </>
  );
}
