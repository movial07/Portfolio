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

interface FolderCardProps {
  item: ReviewItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ item, index, isOpen, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Active state is either clicked open or hovered
  const active = isOpen || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full cursor-pointer group perspective-1000 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
    >
      {/* Folder Container */}
      <div className="relative w-full pt-8 pb-4">
        {/* Top Folder Tab */}
        <div className="absolute top-2 left-6 z-10 flex items-center gap-3 bg-[#191d26] border border-neutral-700/80 px-4 py-1.5 rounded-t-xl text-xs font-mono text-neutral-300 border-b-0 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="font-semibold uppercase tracking-wider">
            DOC_0{index + 1}.TXT
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-400">{item.name}</span>
        </div>

        {/* Outer Folder Body */}
        <div className="relative w-full bg-[#0d0f14] rounded-2xl rounded-tl-none border border-neutral-800 p-6 sm:p-8 min-h-[260px] flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:border-neutral-700">
          
          {/* Inner Paper Slip-Out (ReactBits Paper Reveal) */}
          <motion.div
            initial={false}
            animate={{
              y: active ? -24 : 0,
              scale: active ? 1.02 : 1,
              boxShadow: active
                ? '0 20px 40px -15px rgba(0,0,0,0.7)'
                : '0 4px 12px rgba(0,0,0,0.3)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative z-20 bg-[#161a23] border border-neutral-700/70 rounded-xl p-6 sm:p-8 text-white flex flex-col justify-between"
          >
            {/* Header inside Paper */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-neutral-600 shadow-md">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">{item.name}</h3>
                  {item.verified && (
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1d9bf0] text-white text-[10px] font-bold" title="Verified Creator">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-neutral-400">{item.meta}</span>
              </div>

              {/* Platform Pill */}
              <div className="ml-auto shrink-0">
                {item.platform === 'youtube' ? (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
                    YouTube
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-pink-600/20 text-pink-400 border border-pink-500/30">
                    Instagram
                  </span>
                )}
              </div>
            </div>

            {/* Review Quote Content */}
            <p className="text-sm sm:text-base font-normal text-neutral-200 leading-relaxed font-sans">
              "{item.review}"
            </p>

            {/* Interactive Open Hint Indicator */}
            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-400' : 'bg-neutral-600'}`} />
                {active ? 'FOLDER OPEN' : 'CLICK TO EXPAND'}
              </span>
              <span className="text-neutral-400 group-hover:text-white transition-colors">
                {active ? '📂 CLOSE' : '📁 OPEN'}
              </span>
            </div>
          </motion.div>

          {/* Folder Front Cover Flap with 3D Fold Effect */}
          <motion.div
            initial={false}
            animate={{
              rotateX: active ? -18 : 0,
              y: active ? 6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{ transformOrigin: 'bottom' }}
            className="absolute inset-0 z-10 rounded-2xl rounded-tl-none bg-[#090b0f]/80 backdrop-blur-xs border border-neutral-800 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FolderCard;
