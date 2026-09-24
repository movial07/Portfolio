'use client';

import React, { useState } from 'react';
import './DepthCarousel.css';

export interface ReelItem {
  id: string;
  title: string;
  creator: string;
  image: string;
  href: string;
  video?: string;
}

const defaultReels: ReelItem[] = [
  {
    id: '01',
    title: 'Instagram Edit 01',
    creator: 'Instagram Reel',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    href: 'https://www.instagram.com/p/Dax_-yHvjpD/',
    video: '/reels/1.mp4',
  },
  {
    id: '02',
    title: 'Instagram Reel 02',
    creator: 'Instagram Reel',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    href: 'https://www.instagram.com/reel/DYq9NIaIulZ/',
    video: '/reels/2.mp4',
  },
  {
    id: '03',
    title: 'Instagram Cut 03',
    creator: 'Instagram Reel',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    href: 'https://www.instagram.com/p/Da0oXYChPvS/',
    video: '/reels/3.mp4',
  },
  {
    id: '04',
    title: 'Instagram Reel 04',
    creator: 'Instagram Reel',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    href: 'https://www.instagram.com/reel/DaVBeugskV2/',
    video: '/reels/4.mp4',
  },
  {
    id: '05',
    title: 'Featured Reel Cut',
    creator: 'Instagram Reel',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
    href: 'https://www.instagram.com/reel/DXMZ7N7E7T9/',
    video: '/reels/5.mp4',
  },
];

export const DepthCarousel: React.FC<{ items?: ReelItem[] }> = ({ items = defaultReels }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({});

  React.useEffect(() => {
    const checkMobile = () => {
      const isNowMobile = window.innerWidth < 640;
      setIsMobile((prev) => (prev !== isNowMobile ? isNowMobile : prev));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = React.useCallback(() => {
    setIsMuted(true);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = React.useCallback(() => {
    setIsMuted(true);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Sync mute state on active video element
  React.useEffect(() => {
    const activeItem = items[activeIndex];
    if (activeItem && activeItem.video) {
      const videoEl = videoRefs.current[activeItem.id];
      if (videoEl) {
        videoEl.muted = isMuted;
      }
    }
  }, [activeIndex, isMuted, items]);

  return (
    <div className="depth-carousel">
      {/* 3D Stage Canvas */}
      <div className="depth-carousel__stage">
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          let filter = 'none';

          if (offset === 0) {
            transform = isMobile
              ? 'translateX(0px) translateZ(40px) rotateY(0deg) scale(1.02)'
              : 'translateX(0px) translateZ(80px) rotateY(0deg) scale(1.08)';
            opacity = 1;
            zIndex = 30;
            filter = 'brightness(1.08) grayscale(0)';
          } else if (offset === 1 || offset === -(items.length - 1)) {
            transform = isMobile
              ? 'translateX(100px) translateZ(-60px) rotateY(-18deg) scale(0.78)'
              : 'translateX(240px) translateZ(-100px) rotateY(-25deg) scale(0.85)';
            opacity = isMobile ? 0.45 : 0.7;
            zIndex = 20;
            filter = 'brightness(0.6) grayscale(0.2)';
          } else if (offset === -1 || offset === items.length - 1) {
            transform = isMobile
              ? 'translateX(-100px) translateZ(-60px) rotateY(18deg) scale(0.78)'
              : 'translateX(-240px) translateZ(-100px) rotateY(25deg) scale(0.85)';
            opacity = isMobile ? 0.45 : 0.7;
            zIndex = 20;
            filter = 'brightness(0.6) grayscale(0.2)';
          } else if (offset === 2 || offset === -(items.length - 2)) {
            transform = isMobile
              ? 'translateX(180px) translateZ(-150px) rotateY(-25deg) scale(0.6)'
              : 'translateX(400px) translateZ(-220px) rotateY(-35deg) scale(0.7)';
            opacity = isMobile ? 0 : 0.4;
            zIndex = 10;
            filter = 'brightness(0.4) grayscale(0.5)';
          } else if (offset === -2 || offset === items.length - 2) {
            transform = isMobile
              ? 'translateX(-180px) translateZ(-150px) rotateY(25deg) scale(0.6)'
              : 'translateX(-400px) translateZ(-220px) rotateY(35deg) scale(0.7)';
            opacity = isMobile ? 0 : 0.4;
            zIndex = 10;
            filter = 'brightness(0.4) grayscale(0.5)';
          }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isActive) {
                  setIsMuted(true);
                  setActiveIndex(index);
                }
              }}
              style={{
                transform,
                opacity,
                zIndex,
                filter,
              }}
              className="depth-carousel__card group"
            >
              {item.video && isActive ? (
                <video
                  ref={(el) => {
                    videoRefs.current[item.id] = el;
                  }}
                  src={item.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/movial-placeholder.jpeg"
                  className="w-full h-full object-cover block pointer-events-none"
                />
              ) : (
                <img src="/movial-placeholder.jpeg" alt={item.title} className="w-full h-full object-cover block pointer-events-none" />
              )}

              {/* Card Controls Overlay */}
              <div className="depth-carousel__overlay pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center w-full gap-2">
                  {/* Mute/Unmute Audio Button for Active Card */}
                  {item.video && isActive ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((prev) => !prev);
                      }}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center pointer-events-auto hover:scale-110 hover:bg-black/80 transition-all shadow-xl"
                      title={isMuted ? 'Unmute sound' : 'Mute sound'}
                    >
                      {isMuted ? (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>
                  ) : <div />}

                  {/* Open Profile Button Pill on Top Right */}
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="pointer-events-auto inline-flex items-center gap-1.5 bg-black/75 hover:bg-black text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 hover:border-white shrink-0 ml-auto"
                    >
                      <span>OPEN PROFILE</span>
                      <span className="text-xs">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="depth-carousel__controls">
        <button type="button" onClick={handlePrev} className="depth-carousel__btn">
          ‹
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-200 ${idx === activeIndex ? 'w-8 bg-black' : 'w-2 bg-neutral-300'
                }`}
            />
          ))}
        </div>

        <button type="button" onClick={handleNext} className="depth-carousel__btn">
          ›
        </button>
      </div>
    </div>
  );
};

export default DepthCarousel;
