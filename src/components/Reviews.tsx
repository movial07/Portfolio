'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactBitsFolderWrapper, { ReviewItem } from './ReactBitsFolder';

const reviewsData: ReviewItem[] = [
  {
    id: '01',
    name: 'Ian Panda',
    meta: '12.1K subscribers',
    verified: true,
    avatar: '/avatars/ian.jpg',
    review: "Veeral was quick and responsive. He's talented.",
    platform: 'youtube',
  },
  {
    id: '02',
    name: 'SatyaVachan Shivam',
    meta: '873 subscribers',
    verified: true,
    avatar: '/avatars/satyavachan.png',
    review:
      'Veeral is a very quick learner. He is extremely patient and incorporates all the changes as requested. His creativity and end to end ownership is something I really admire',
    platform: 'youtube',
  },
  {
    id: '03',
    name: 'Harshit Dwivedi',
    meta: '3.5M+ subscribers',
    verified: true,
    avatar: '/avatars/harshit.png',
    review:
      'Working with Veeral on shorts and long-form cuts has been seamless. He understands pacing, retention hooks, and delivers polished edits every single time.',
    platform: 'youtube',
  },
  {
    id: '04',
    name: 'Meet Shivam',
    meta: '119K followers',
    verified: true,
    avatar: '/avatars/meet.jpg',
    review:
      'Veeral elevates every single piece of footage. The transitions, sound design, and visual flow are top notch. Highly recommended for any creator!',
    platform: 'instagram',
  },
  {
    id: '05',
    name: 'Kartikey Singh',
    meta: '150K+ followers',
    verified: true,
    avatar: '/avatars/kartikey.png',
    review:
      "Veeral's speed, attention to detail, and storytelling ability turned our raw footage into top-performing content. Outstanding editor.",
    platform: 'instagram',
  },
];

interface ReviewsProps {
  onFolderOpen?: () => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ onFolderOpen }) => {
  return (
    <section id="reviews" className="bg-white text-black py-24 sm:py-36 px-6 sm:px-12 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-4"
          >
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none text-black">
              Reviews
            </h2>
          </motion.div>
        </div>

        {/* Official ReactBits Style Folder Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full pt-4"
        >
          <ReactBitsFolderWrapper items={reviewsData} onFolderOpen={onFolderOpen} />
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
