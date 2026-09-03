'use client';

import React, { useEffect, useRef } from 'react';

interface Dot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  currentRadius: number;
  active: boolean;
  intensity: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
}

export const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Request high-performance canvas context
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking with high-speed response
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      vx: 0,
      vy: 0,
      isInside: false,
    };

    // Soft fluid glow orb coordinates
    const glow = {
      x: width / 2,
      y: height / 2,
      radius: 340,
    };

    let dots: Dot[] = [];
    const waves: Wave[] = [];

    // Initialize Grid with optimal spacing for 120FPS rendering
    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      dots = [];
      // Clean, airy spacing (~42px-48px) for minimal aesthetic and lightning performance
      const spacing = Math.max(40, Math.min(width / 26, 48));
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;
          const y = offsetY + r * spacing;
          dots.push({
            originX: x,
            originY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            baseRadius: 1.6,
            currentRadius: 1.6,
            active: false,
            intensity: 0,
          });
        }
      }
    };

    initGrid();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.targetX = x;
      mouse.targetY = y;
      mouse.isInside = true;
    };

    const handleMouseLeave = () => {
      mouse.isInside = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        mouse.targetX = x;
        mouse.targetY = y;
        mouse.isInside = true;
      }
    };

    // Click triggers rapid concentric shockwave
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      waves.push({
        x,
        y,
        radius: 12,
        maxRadius: Math.max(width, height) * 0.7,
        speed: 32, // Fast, electric impulse
        strength: 1.0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      initGrid();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Physics constants
    const spring = 0.32;
    const damping = 0.78;
    const mouseInfluenceRadius = 195;
    const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

    let lastTime = performance.now();

    // High-performance 120FPS animation render loop
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Delta time normalization
      const dt = Math.min((now - lastTime) / 16.67, 2.0);
      lastTime = now;

      // Fast mouse interpolation
      if (mouse.isInside) {
        mouse.vx = (mouse.targetX - mouse.x) * 0.55 * dt;
        mouse.vy = (mouse.targetY - mouse.y) * 0.55 * dt;
        mouse.x += mouse.vx;
        mouse.y += mouse.vy;

        // Snappy glow follower
        glow.x += (mouse.x - glow.x) * 0.22 * dt;
        glow.y += (mouse.y - glow.y) * 0.22 * dt;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Spotlight behind Text (Smooth, soft gradient)
      if (mouse.isInside) {
        const spotlight = ctx.createRadialGradient(
          glow.x,
          glow.y,
          0,
          glow.x,
          glow.y,
          glow.radius
        );
        spotlight.addColorStop(0, 'rgba(239, 68, 68, 0.12)');
        spotlight.addColorStop(0.5, 'rgba(251, 146, 60, 0.035)');
        spotlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update Shockwave Waves
      const hasWaves = waves.length > 0;
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += w.speed * dt;
        w.strength *= Math.pow(0.93, dt);

        if (w.radius >= w.maxRadius || w.strength < 0.015) {
          waves.splice(i, 1);
        }
      }

      // Arrays to separate batch drawing for ultra-high 120 FPS
      const idleDots: Dot[] = [];
      const activeDots: Dot[] = [];

      // 3. Update Physics (Fast squared-distance checks)
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const distSq = dx * dx + dy * dy;

        let targetX = dot.originX;
        let targetY = dot.originY;
        let targetRadius = dot.baseRadius;
        let intensity = 0;

        // Mouse interaction using fast squared distance
        if (mouse.isInside && distSq < mouseInfluenceRadiusSq) {
          const dist = Math.sqrt(distSq);
          const factor = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          intensity = Math.pow(factor, 1.3);

          const push = intensity * 32;
          const invDist = dist > 0 ? 1 / dist : 0;
          const cos = dx * invDist;
          const sin = dy * invDist;

          const wakePushX = mouse.vx * intensity * 1.5;
          const wakePushY = mouse.vy * intensity * 1.5;

          targetX = dot.originX - cos * push + wakePushX;
          targetY = dot.originY - sin * push + wakePushY;
          targetRadius = dot.baseRadius + intensity * 3.4;
        }

        // Apply Click Waves if any
        if (hasWaves) {
          for (let j = 0; j < waves.length; j++) {
            const w = waves[j];
            const wdx = dot.originX - w.x;
            const wdy = dot.originY - w.y;
            const distWave = Math.hypot(wdx, wdy);
            const waveDistDiff = Math.abs(distWave - w.radius);

            if (waveDistDiff < 45) {
              const waveIntensity = (1 - waveDistDiff / 45) * w.strength;
              const invWDist = distWave > 0 ? 1 / distWave : 0;
              targetX += wdx * invWDist * waveIntensity * 36;
              targetY += wdy * invWDist * waveIntensity * 36;
              targetRadius = Math.max(targetRadius, dot.baseRadius + waveIntensity * 3.6);
              intensity = Math.max(intensity, waveIntensity);
            }
          }
        }

        // High-speed spring integration
        const ax = (targetX - dot.x) * spring;
        const ay = (targetY - dot.y) * spring;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        // Snappy radius interpolation
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.55 * dt;
        dot.intensity = intensity;

        // Sort into active vs idle for single-pass batch rendering
        if (intensity > 0.04 || Math.abs(dot.x - dot.originX) > 0.8 || Math.abs(dot.y - dot.originY) > 0.8) {
          dot.active = true;
          activeDots.push(dot);
        } else {
          dot.active = false;
          idleDots.push(dot);
        }
      }

      // 4. BATCH RENDER IDLE DOTS IN A SINGLE DRAW CALL (Instantaneous 120 FPS!)
      if (idleDots.length > 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
        ctx.beginPath();
        for (let i = 0; i < idleDots.length; i++) {
          const d = idleDots[i];
          ctx.moveTo(d.x + d.baseRadius, d.y);
          ctx.arc(d.x, d.y, d.baseRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 5. Render Active Dots (With high-performance geometric glow)
      for (let i = 0; i < activeDots.length; i++) {
        const d = activeDots[i];
        const intensity = d.intensity;

        const r = Math.round(0 + intensity * 239);
        const g = Math.round(0 + intensity * 68);
        const b = Math.round(0 + intensity * 68);
        const alpha = 0.12 + intensity * 0.84;

        // Soft outer halo without expensive shadowBlur
        if (intensity > 0.35) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${intensity * 0.18})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 will-change-transform"
      style={{ transform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default InteractiveBackground;
