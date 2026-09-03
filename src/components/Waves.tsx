'use client';

import React, { useEffect, useRef } from 'react';

export interface WavesProps {
  lineColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  className?: string;
}

interface WavePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  cursorOffsetX: number;
  cursorOffsetY: number;
}

export const Waves: React.FC<WavesProps> = ({
  lineColor = 'rgba(0, 0, 0, 0.09)',
  accentColor = 'rgba(239, 68, 68, 0.45)',
  backgroundColor = 'transparent',
  waveSpeedX = 0.016,
  waveSpeedY = 0.008,
  waveAmpX = 20,
  waveAmpY = 24,
  xGap = 16,
  yGap = 36,
  friction = 0.93,
  tension = 0.012,
  maxCursorMove = 140,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking with velocity
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      isInside: false,
    };

    // Ambient glow orb follower
    const glow = {
      x: width / 2,
      y: height / 2,
    };

    // Lines grid of points
    let lines: WavePoint[][] = [];

    const initLines = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      lines = [];

      // Calculate number of horizontal lines and points per line
      const numLines = Math.ceil(height / yGap) + 2;
      const numPoints = Math.ceil(width / xGap) + 3;
      const startY = (height - (numLines - 1) * yGap) / 2;

      for (let l = 0; l < numLines; l++) {
        const line: WavePoint[] = [];
        const baseLineY = startY + l * yGap;

        for (let p = 0; p < numPoints; p++) {
          const x = (p - 1) * xGap;
          line.push({
            x,
            y: baseLineY,
            originX: x,
            originY: baseLineY,
            vx: 0,
            vy: 0,
            cursorOffsetX: 0,
            cursorOffsetY: 0,
          });
        }
        lines.push(line);
      }
    };

    initLines();

    // Click impulse shockwaves
    interface ClickWave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      strength: number;
    }
    const clickWaves: ClickWave[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (mouse.prevX !== -9999) {
        mouse.vx = x - mouse.prevX;
        mouse.vy = y - mouse.prevY;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);
      }

      mouse.x = x;
      mouse.y = y;
      mouse.prevX = x;
      mouse.prevY = y;
      mouse.isInside = true;
    };

    const handleMouseLeave = () => {
      mouse.isInside = false;
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.speed = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        if (mouse.prevX !== -9999) {
          mouse.vx = x - mouse.prevX;
          mouse.vy = y - mouse.prevY;
        }

        mouse.x = x;
        mouse.y = y;
        mouse.prevX = x;
        mouse.prevY = y;
        mouse.isInside = true;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      clickWaves.push({
        x,
        y,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.7,
        speed: 26,
        strength: 1.0,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      initLines();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let time = 0;
    let lastTime = performance.now();
    const maxCursorMoveSq = maxCursorMove * maxCursorMove;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 16.67, 2.0);
      lastTime = now;

      time += 0.04 * dt;

      // Smooth glow follower
      if (mouse.isInside) {
        glow.x += (mouse.x - glow.x) * 0.2 * dt;
        glow.y += (mouse.y - glow.y) * 0.2 * dt;
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;
      }

      ctx.clearRect(0, 0, width, height);

      // Background color
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Ambient red cursor spotlight behind waves & text
      if (mouse.isInside) {
        const spotlight = ctx.createRadialGradient(
          glow.x,
          glow.y,
          0,
          glow.x,
          glow.y,
          320
        );
        spotlight.addColorStop(0, 'rgba(239, 68, 68, 0.12)'); // Movial crimson
        spotlight.addColorStop(0.5, 'rgba(251, 146, 60, 0.035)');
        spotlight.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // Update click shockwaves
      const hasWaves = clickWaves.length > 0;
      for (let i = clickWaves.length - 1; i >= 0; i--) {
        const w = clickWaves[i];
        w.radius += w.speed * dt;
        w.strength *= Math.pow(0.94, dt);

        if (w.radius >= w.maxRadius || w.strength < 0.015) {
          clickWaves.splice(i, 1);
        }
      }

      // Update and draw each wave line
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        const linePhase = l * 0.35;
        const isAccentLine = l % 5 === 2; // Subtle red accent wave every 5th line

        // 1. Update Physics for Points in Line
        for (let p = 0; p < line.length; p++) {
          const pt = line[p];

          // Harmonic wave motion (multi-octave fluid sine waves)
          const waveX = Math.sin(time * waveSpeedX + pt.originX * 0.003 + linePhase) * waveAmpX;
          const waveY =
            Math.sin(time * waveSpeedX * 1.5 + pt.originX * 0.005 + linePhase) * waveAmpY +
            Math.cos(time * waveSpeedY + linePhase * 1.2) * (waveAmpY * 0.4);

          // Fast squared distance cursor interaction
          if (mouse.isInside) {
            const currentTotalX = pt.originX + waveX + pt.cursorOffsetX;
            const currentTotalY = pt.originY + waveY + pt.cursorOffsetY;

            const dx = mouse.x - currentTotalX;
            const dy = mouse.y - currentTotalY;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxCursorMoveSq) {
              const dist = Math.sqrt(distSq);
              const factor = (maxCursorMove - dist) / maxCursorMove;
              const force = Math.pow(factor, 1.4) * 4.5;

              const invDist = dist > 0 ? 1 / dist : 0;
              const pushX = dx * invDist;
              const pushY = dy * invDist;

              // Apply mouse wake and elastic repulsion
              pt.vx -= (pushX * force + mouse.vx * factor * 0.35) * dt;
              pt.vy -= (pushY * force + mouse.vy * factor * 0.35) * dt;
            }
          }

          // Click shockwaves effect
          if (hasWaves) {
            for (let wIdx = 0; wIdx < clickWaves.length; wIdx++) {
              const w = clickWaves[wIdx];
              const wdx = pt.originX - w.x;
              const wdy = pt.originY - w.y;
              const distWave = Math.hypot(wdx, wdy);
              const waveDistDiff = Math.abs(distWave - w.radius);

              if (waveDistDiff < 40) {
                const waveIntensity = (1 - waveDistDiff / 40) * w.strength;
                const invWDist = distWave > 0 ? 1 / distWave : 0;
                pt.vx += wdx * invWDist * waveIntensity * 12 * dt;
                pt.vy += wdy * invWDist * waveIntensity * 12 * dt;
              }
            }
          }

          // Spring tension returning to center + friction
          const fx = -pt.cursorOffsetX * tension;
          const fy = -pt.cursorOffsetY * tension;

          pt.vx = (pt.vx + fx) * friction;
          pt.vy = (pt.vy + fy) * friction;

          pt.cursorOffsetX += pt.vx * dt;
          pt.cursorOffsetY += pt.vy * dt;

          pt.x = pt.originX + waveX + pt.cursorOffsetX;
          pt.y = pt.originY + waveY + pt.cursorOffsetY;
        }

        // 2. Draw Smooth Bézier Wave Line
        if (line.length > 2) {
          ctx.beginPath();
          ctx.moveTo(line[0].x, line[0].y);

          for (let p = 0; p < line.length - 1; p++) {
            const xc = (line[p].x + line[p + 1].x) / 2;
            const yc = (line[p].y + line[p + 1].y) / 2;
            ctx.quadraticCurveTo(line[p].x, line[p].y, xc, yc);
          }

          // Line to the last point
          const lastPt = line[line.length - 1];
          ctx.lineTo(lastPt.x, lastPt.y);

          // Check if cursor is nearby to illuminate the line in red
          let lineDistToMouse = 9999;
          if (mouse.isInside) {
            lineDistToMouse = Math.abs(line[0].originY - mouse.y);
          }

          if (lineDistToMouse < 100) {
            const glowFactor = (100 - lineDistToMouse) / 100;
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 + glowFactor * 0.55})`;
            ctx.lineWidth = 1.6 + glowFactor * 1.2;
          } else if (isAccentLine) {
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 1.3;
          } else {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1.1;
          }

          ctx.stroke();
        }
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
  }, [
    lineColor,
    accentColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    xGap,
    yGap,
    friction,
    tension,
    maxCursorMove,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 will-change-transform ${className}`}
      style={{ transform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Waves;
