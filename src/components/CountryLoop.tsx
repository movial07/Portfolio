'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface CountryItem {
  name: string;
  flag: string;
}

const countries: CountryItem[] = [
  { name: 'India', flag: '🇮🇳' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'US', flag: '🇺🇸' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Mexico', flag: '🇲🇽' },
];

export const CountryLoop: React.FC = () => {
  // Duplicate array 3 times for seamless 100% infinite marquee loop
  const loopList = [...countries, ...countries, ...countries];

  return (
    <div className="w-full mt-12 sm:mt-16 pt-8 border-t border-neutral-200/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 overflow-hidden">
        {/* ReactBits Style Header Label */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-neutral-500">
            WORKED WITH CREATORS IN
          </span>
        </div>

        {/* Infinite Scrolling Track */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={{ x: ['0%', '-33.333%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 18,
            }}
          >
            {loopList.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2.5 bg-neutral-100/90 border border-neutral-200/80 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-black shadow-xs hover:scale-105 hover:bg-black hover:text-white transition-all cursor-default select-none"
              >
                <span className="text-base sm:text-lg leading-none">{item.flag}</span>
                <span className="tracking-wide font-medium">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountryLoop;
