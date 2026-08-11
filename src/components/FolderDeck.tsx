'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ReviewItem {
  id: string;
  name: string;
  meta: string;
  verified?: boolean;
  avatar: string;
  review: string;
  platform: 'youtube' | 'instagram';
}

interface FolderDeckProps {
  items: ReviewItem[];
}

export const FolderDeck: React.FC<FolderDeckProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Folder Top File Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 px-2 scrollbar-none">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-t-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border border-b-0 shrink-0 ${
                isActive
                  ? 'bg-[#161a23] text-white border-neutral-700 shadow-lg translate-y-[2px] z-20'
                  : 'bg-[#0d0f14]/80 text-neutral-400 border-neutral-800 hover:bg-[#12151c] hover:text-neutral-200 z-10'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'
                }`}
              />
              <span className="uppercase tracking-wider">
                0{idx + 1}. {item.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Single Master Folder Container */}
      <div className="relative w-full bg-[#0d0f14] rounded-2xl rounded-tl-none border border-neutral-800 p-6 sm:p-10 shadow-2xl z-20 overflow-hidden">
        {/* Subtle Inner Glow & Folder Label */}
        <div className="flex justify-between items-center pb-6 border-b border-neutral-800/80 mb-6 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            MASTER CLIENT ARCHIVE • {items.length} FILES
          </span>
          <span className="hidden sm:inline-block tracking-widest uppercase">
            FILE_ID: {activeItem.id}
          </span>
        </div>

        {/* Animated Active Review Document Sheet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#161a23] border border-neutral-700/80 rounded-xl p-6 sm:p-10 text-white shadow-xl flex flex-col justify-between min-h-[220px]"
          >
            {/* Header: Reviewer Profile */}
            <div className="flex items-center gap-4 sm:gap-5 mb-6">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-neutral-600 shadow-md">
                <img
                  src={activeItem.avatar}
                  alt={activeItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    {activeItem.name}
                  </h3>
                  {activeItem.verified && (
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1d9bf0] text-white text-[10px] sm:text-xs font-bold"
                      title="Verified Creator"
                    >
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-mono text-neutral-400">
                  {activeItem.meta}
                </span>
              </div>

              {/* Platform Badge */}
              <div className="ml-auto shrink-0">
                {activeItem.platform === 'youtube' ? (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                    YouTube
                  </span>
                ) : (
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30">
                    Instagram
                  </span>
                )}
              </div>
            </div>

            {/* Review Statement Quote */}
            <p className="text-base sm:text-xl font-normal text-neutral-200 leading-relaxed font-sans italic">
              "{activeItem.review}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800/80 text-xs font-mono">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
            }
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
          >
            ← PREV FILE
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-red-500' : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
          >
            NEXT FILE →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderDeck;
