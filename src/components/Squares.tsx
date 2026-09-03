'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'down' | 'left' | 'right';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

interface HoveredSquare {
  col: number;
  row: number;
  alpha: number;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.4,
  borderColor = 'rgba(0, 0, 0, 0.055)',
  squareSize = 52,
  hoverFillColor = 'rgba(239, 68, 68, 0.16)', // Movial Crimson accent
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let gridOffset = { x: 0, y: 0 };
    let hoveredSquares: HoveredSquare[] = [];

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let mouse = { x: -9999, y: -9999, isInside: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = x;
      mouse.y = y;
      mouse.isInside = true;
      setMousePos({ x, y });

      // Identify hovered square with grid offset
      const col = Math.floor((x - (gridOffset.x % squareSize)) / squareSize);
      const row = Math.floor((y - (gridOffset.y % squareSize)) / squareSize);

      // Add to hovered squares with decaying trail
      const existing = hoveredSquares.find((s) => s.col === col && s.row === row);
      if (existing) {
        existing.alpha = 1.0;
      } else {
        hoveredSquares.push({ col, row, alpha: 1.0 });
      }

      // Also gently highlight neighboring tiles for a soft fluid brush feel
      [
        { dc: -1, dr: 0, a: 0.35 },
        { dc: 1, dr: 0, a: 0.35 },
        { dc: 0, dr: -1, a: 0.35 },
        { dc: 0, dr: 1, a: 0.35 },
      ].forEach(({ dc, dr, a }) => {
        const nc = col + dc;
        const nr = row + dr;
        const nExist = hoveredSquares.find((s) => s.col === nc && s.row === nr);
        if (!nExist) {
          hoveredSquares.push({ col: nc, row: nr, alpha: a });
        }
      });
    };

    const handleMouseLeave = () => {
      mouse.isInside = false;
      mouse.x = -9999;
      mouse.y = -9999;
      setMousePos({ x: -9999, y: -9999 });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        mouse.x = x;
        mouse.y = y;
        mouse.isInside = true;
        setMousePos({ x, y });

        const col = Math.floor((x - (gridOffset.x % squareSize)) / squareSize);
        const row = Math.floor((y - (gridOffset.y % squareSize)) / squareSize);

        const existing = hoveredSquares.find((s) => s.col === col && s.row === row);
        if (existing) {
          existing.alpha = 1.0;
        } else {
          hoveredSquares.push({ col, row, alpha: 1.0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTime = performance.now();

    // Ultra-lightweight rendering loop: zero heavy math, zero trigonometric per-vertex loops!
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 16.67, 2.0);
      lastTime = now;

      // Update grid drift offset based on direction
      const moveAmount = speed * dt;
      switch (direction) {
        case 'right':
          gridOffset.x += moveAmount;
          break;
        case 'left':
          gridOffset.x -= moveAmount;
          break;
        case 'up':
          gridOffset.y -= moveAmount;
          break;
        case 'down':
          gridOffset.y += moveAmount;
          break;
        case 'diagonal':
        default:
          gridOffset.x += moveAmount;
          gridOffset.y += moveAmount;
          break;
      }

      ctx.clearRect(0, 0, width, height);

      const startX = Math.floor(gridOffset.x % squareSize) - squareSize;
      const startY = Math.floor(gridOffset.y % squareSize) - squareSize;

      const numCols = Math.ceil(width / squareSize) + 2;
      const numRows = Math.ceil(height / squareSize) + 2;

      // 1. Draw Hovered / Illuminated Squares (Fading Trails)
      for (let i = hoveredSquares.length - 1; i >= 0; i--) {
        const sq = hoveredSquares[i];
        sq.alpha -= 0.025 * dt;

        if (sq.alpha <= 0) {
          hoveredSquares.splice(i, 1);
          continue;
        }

        const sqX = startX + sq.col * squareSize;
        const sqY = startY + sq.row * squareSize;

        // Draw soft illuminated square
        ctx.fillStyle = `rgba(239, 68, 68, ${sq.alpha * 0.18})`;
        ctx.fillRect(sqX, sqY, squareSize, squareSize);

        // Highlight inner border
        ctx.strokeStyle = `rgba(239, 68, 68, ${sq.alpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(sqX + 0.5, sqY + 0.5, squareSize - 1, squareSize - 1);
      }

      // 2. Draw Batched Clean Grid Lines in One Single Pass! (Ultra low CPU)
      ctx.beginPath();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let c = 0; c <= numCols; c++) {
        const x = Math.round(startX + c * squareSize) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Horizontal lines
      for (let r = 0; r <= numRows; r++) {
        const y = Math.round(startY + r * squareSize) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Hardware-accelerated CSS Ambient Cursor Spotlight (Zero JS Loop Overhead!) */}
      {mousePos.x !== -9999 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.08), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};

export default Squares;
