'use client';

import React from 'react';
import Folder from './Folder';

export interface ReviewItem {
  id: string;
  name: string;
  meta: string;
  verified?: boolean;
  avatar: string;
  review: string;
  platform: 'youtube' | 'instagram';
}

interface ReactBitsFolderWrapperProps {
  items: ReviewItem[];
  onFolderOpen?: () => void;
}

export const ReactBitsFolderWrapper: React.FC<ReactBitsFolderWrapperProps> = ({ items, onFolderOpen }) => {
  // Render complete review card for each paper in official ReactBits <Folder />
  const folderPapers = items.slice(0, 4).map((item) => (
    <div
      key={item.id}
      className="w-full h-full p-3 sm:p-4 text-white flex flex-col justify-between select-none bg-[#0f1117]/95 border border-neutral-700/80 rounded-xl shadow-xl hover:border-red-500/80 transition-all group"
    >
      {/* Reviewer Info Header */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-neutral-600 shrink-0"
        />
        <div className="flex flex-col truncate">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-white truncate leading-tight">
              {item.name}
            </span>
            {item.verified && (
              <span className="text-[9px] text-[#1d9bf0]" title="Verified">
                ✓
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono text-neutral-400 truncate">
            {item.meta}
          </span>
        </div>

        <span className="ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
          {item.platform}
        </span>
      </div>

      {/* Complete Testimonial Quote - Fully Displayed */}
      <p className="text-[11px] font-normal text-neutral-200 leading-relaxed italic">
        "{item.review}"
      </p>
    </div>
  ));

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center select-none pt-12 pb-12">
      {/* Official ReactBits <Folder /> positioned 20% upwards */}
      <div className="relative flex flex-col items-center justify-center min-h-[440px] w-full pt-8 -translate-y-12 sm:-translate-y-16">
        <Folder
          color="#0d0f14"
          size={1.3}
          items={folderPapers}
          onToggle={(isOpen) => {
            if (isOpen && onFolderOpen) {
              onFolderOpen();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ReactBitsFolderWrapper;
