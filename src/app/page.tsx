'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import DriftWall from '@/components/DriftWall';
import DepthCarousel, { ReelItem } from '@/components/DepthCarousel';
import CountryLoop from '@/components/CountryLoop';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import StrokeText from '@/components/StrokeText';
import LogoLoop, { LogoItem } from '@/components/LogoLoop';
import Squares from '@/components/Squares';

const workedWithLogos: LogoItem[] = [
  {
    src: '/logos/upgrad.png',
    alt: 'upGrad',
    title: 'upGrad',
  },
  {
    src: '/logos/simplilearn.png',
    alt: 'Simplilearn',
    title: 'Simplilearn',
  },
  {
    src: '/logos/wisprflow.png',
    alt: 'Wispr Flow',
    title: 'Wispr Flow',
  },
  {
    src: '/logos/saregama.png',
    alt: 'Saregama',
    title: 'Saregama',
  },
  {
    src: '/logos/workory.png',
    alt: 'Workory Talent',
    title: 'Workory Talent',
  },
  {
    src: '/logos/slice.png',
    alt: 'Slice',
    title: 'Slice',
  },
  {
    src: '/logos/omnidimension.png',
    alt: 'Omni Dimension',
    title: 'Omni Dimension',
  },
  {
    src: '/logos/superprofile.png',
    alt: 'SuperProfile',
    title: 'SuperProfile',
  },
  {
    src: '/logos/mirai.png',
    alt: 'Mirai',
    title: 'Mirai',
  },
  {
    src: '/logos/grncoastal.png',
    alt: 'GRN Coastal',
    title: 'GRN Coastal',
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFolderOpen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 350);
  };

  // Fade out "by veeral" branding as user scrolls into the next section
  const byVeeralOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const byVeeralY = useTransform(scrollY, [0, 300], [0, -15]);

  const aboutParagraphs = [
    'Since 2023, Movial has been helping individual creators turn their ideas into something worth watching. We believe great content is not just about having the right footage. It is about having the vision, creativity, and craft to bring every frame together with purpose.',
    'We understand that every creator has a unique style and a story worth telling. That is why our approach is built around understanding the creator first, then shaping the footage around their vision. Every cut, transition, sound, and visual detail is carefully crafted to make the final result feel intentional and authentic.',
    "What started in 2023 continues with one simple goal: to make high quality video editing more accessible to creators who want to create something they can truly be proud of. Here's some of our work :)",
  ];

  // 100% User Provided YouTube Long Videos & Channels
  const workItems = [
    {
      image: 'https://img.youtube.com/vi/TlAsJYgexDA/hqdefault.jpg',
      title: 'Long Form Video Edit',
      href: 'https://youtu.be/TlAsJYgexDA?si=WjzPp9oKEr8qKFnm',
    },
    {
      image: 'https://img.youtube.com/vi/qVpRUZiPyAw/hqdefault.jpg',
      title: 'Featured YouTube Edit',
      href: 'https://www.youtube.com/watch?v=qVpRUZiPyAw',
    },
    {
      image: 'https://img.youtube.com/vi/zmtE0WnQGB4/hqdefault.jpg',
      title: 'Pradeep Kumar Video',
      href: 'https://youtu.be/zmtE0WnQGB4?si=l4f5ClhTPfZOhb_X',
    },
    {
      image: 'https://img.youtube.com/vi/ocVneDTN4wY/hqdefault.jpg',
      title: 'Long Form Storytelling',
      href: 'https://youtu.be/ocVneDTN4wY?si=qcgVM3n9oXk5ebVb',
    },
    {
      image: 'https://img.youtube.com/vi/no6luAMvIEg/hqdefault.jpg',
      title: 'Video Cut',
      href: 'https://www.youtube.com/watch?v=no6luAMvIEg',
    },
    {
      image: 'https://img.youtube.com/vi/0y_OmipkG_c/hqdefault.jpg',
      title: 'Video Story',
      href: 'https://youtu.be/0y_OmipkG_c?si=W-taXU7r30NgsaaA',
    },
    {
      image: 'https://img.youtube.com/vi/Mk3zasCMxRQ/hqdefault.jpg',
      title: 'Feature Showcase 1',
      href: 'https://youtu.be/Mk3zasCMxRQ?si=DnftX3R9KKuidWYk',
    },
    {
      image: 'https://img.youtube.com/vi/WRA5OfeUP9I/hqdefault.jpg',
      title: 'Feature Showcase 2',
      href: 'https://youtu.be/WRA5OfeUP9I?si=2K1XKmdZRiJe5mWZ',
    },
    {
      image: 'https://img.youtube.com/vi/5ez2gH0lII8/hqdefault.jpg',
      title: 'Long Video Showcase',
      href: 'https://youtu.be/5ez2gH0lII8?si=SuP8po0ZUsstPjWc',
    },
    {
      image: 'https://img.youtube.com/vi/cnAjqh9tWUI/hqdefault.jpg',
      title: 'Cinematic Long Edit',
      href: 'https://youtu.be/cnAjqh9tWUI?si=oL7rNh_4fH9YnqOD',
    },
    {
      image: 'https://img.youtube.com/vi/iZKCy25gccY/hqdefault.jpg',
      title: 'Creator Documentary',
      href: 'https://youtu.be/iZKCy25gccY?si=zVzd1ZlbXJqVJciJ',
    },
    {
      image: 'https://img.youtube.com/vi/5ez2gH0lII8/hqdefault.jpg',
      title: 'Satyavachan Shivam',
      href: 'https://youtube.com/@satyavachanshivam?si=qPPAWslc89yQECCv',
    },
  ];

  // 100% User Provided Local MP4 Reels (7 Total)
  const reelItems: ReelItem[] = [
    {
      id: '01',
      title: 'Harshit Dwivedi Videos',
      creator: 'YouTube Shorts',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.youtube.com/@HARSHITDWIVEDIVIDEOS/shorts',
      video: '/reels/1.mp4',
    },
    {
      id: '02',
      title: 'Meet Shivam',
      creator: 'Instagram Reel',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.instagram.com/meet_.shivam/',
      video: '/reels/2.mp4',
    },
    {
      id: '03',
      title: 'Degree Crafters',
      creator: 'Instagram Reel',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.instagram.com/degreecrafters?utm_source=ig_web_button_share_sheet',
      video: '/reels/3.mp4',
    },
    {
      id: '04',
      title: 'Kartikey Singh',
      creator: 'Instagram Reel',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.instagram.com/kartikeysinggh?utm_source=ig_web_button_share_sheet',
      video: '/reels/4.mp4',
    },
    {
      id: '05',
      title: 'Shubham Codes',
      creator: 'Instagram Reel',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.instagram.com/shubhaam.codes/',
      video: '/reels/5.mp4',
    },
    {
      id: '06',
      title: 'CodeSpace Lab',
      creator: 'Instagram Reel',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.instagram.com/codespacelab/reels/',
      video: '/reels/6.mp4',
    },
    {
      id: '07',
      title: 'Mr. Universe',
      creator: 'YouTube Shorts',
      image: '/movial-placeholder.jpeg',
      href: 'https://www.youtube.com/@Mr.Universe-c6i/shorts',
      video: '/reels/7.mp4',
    },
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <motion.div
      animate={
        isShaking
          ? {
            x: [0, -4, 4, -2, 2, 0],
            y: [0, 3, -3, 1, 0],
            rotate: [0, -0.4, 0.4, -0.2, 0],
          }
          : { x: 0, y: 0, rotate: 0 }
      }
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white text-black min-h-screen relative overflow-x-hidden"
    >
      {/* Top Left Branding Text - Entrance Animated & Scroll Faded */}
      <motion.div
        style={{ opacity: byVeeralOpacity, y: byVeeralY }}
        className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 flex items-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 select-none"
        >
          <img
            src="/movial-logo.png"
            alt="Movial Logo"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-md"
          />
          <span className="text-xs sm:text-sm font-medium tracking-wider text-black/80 lowercase">
            by veeral
          </span>
        </motion.div>
      </motion.div>

      {/* Top Right Menu Capsule Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50"
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group relative inline-flex items-center gap-2 sm:gap-3 bg-black text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-neutral-900 transition-all duration-300 shadow-xl border border-neutral-800 cursor-pointer"
        >
          <span className="text-xs font-mono font-medium uppercase tracking-wider">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div className="w-4 h-4 sm:w-5 sm:h-5 relative flex items-center justify-center">
            {isMenuOpen ? (
              <span className="text-sm font-mono leading-none">✕</span>
            ) : (
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform delay-75" />
              </div>
            )}
          </div>
        </button>
      </motion.div>

      {/* Interactive Navigation Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="fixed inset-0 z-[45] bg-[#08090c]/98 backdrop-blur-2xl text-white overflow-y-auto max-h-screen"
          >
            <div className="min-h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto w-full">
              {/* Menu Header */}
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  [ NAVIGATION ]
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  MOVIAL • EST. 2023
                </span>
              </div>

              {/* Menu Nav Links */}
              <div className="my-auto py-6 space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection('hero')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    01
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    Home
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  onClick={() => scrollToSection('about-us')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    02
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    About Us
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  onClick={() => scrollToSection('our-work')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    03
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    Long Form Edits
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  onClick={() => scrollToSection('reels')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    04
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    Shorts & Reels
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  onClick={() => scrollToSection('reviews')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    05
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    Reviews
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  onClick={() => scrollToSection('contact')}
                  className="group flex items-baseline gap-6 cursor-pointer border-b border-neutral-800/50 pb-3 hover:border-white transition-colors"
                >
                  <span className="text-sm font-mono text-neutral-500 group-hover:text-white transition-colors">
                    06
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                    Contact Us
                  </span>
                </motion.div>
              </div>

              {/* Menu Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-neutral-400 gap-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-4">
                  <span>High Quality Video Editing Services</span>
                  <a
                    href="https://calendly.com/movial-gro/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    BOOK A CALL 📅
                  </a>
                </div>
                <span>© {new Date().getFullYear()} Movial. All Rights Reserved.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section: Movial Text + Subtitle + ReactBits Interactive Squares */}
      <main id="hero" className="flex min-h-screen flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Official React Bits Interactive Squares Background (Ultra lightweight on CPU & GPU) */}
        <Squares
          direction="diagonal"
          speed={0.35}
          squareSize={isMobile ? 38 : 48}
          borderColor="rgba(0, 0, 0, 0.05)"
          hoverFillColor="rgba(239, 68, 68, 0.16)"
        />

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.25 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-[17vw] sm:text-[18.75vw] font-semibold tracking-[-0.06em] leading-[0.8] select-none text-center whitespace-nowrap pointer-events-none"
        >
          movial
        </motion.h1>

        {/* Subtitle with Staggered Blur Fade-Up Animation */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-6 sm:mt-8 text-[10px] sm:text-sm md:text-base font-mono uppercase tracking-[0.14em] sm:tracking-[0.22em] text-neutral-500 text-center select-none max-w-full px-2 pointer-events-none"
        >
          high quality video editing services
        </motion.p>
      </main>

      {/* Section 2: About Us */}
      <section
        id="about-us"
        className="min-h-screen bg-white text-black px-6 sm:px-12 md:px-20 py-24 sm:py-36 relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-4"
          >
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none text-black">
              About Us
            </h2>
          </motion.div>

          {/* Right Column: Spaced & Animated Paragraphs + StrokeText Stats Block + ReactBits Country Loop */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            {/* Paragraph 0 */}
            <motion.p
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl font-medium text-black leading-relaxed border-l-2 border-black pl-6"
            >
              {aboutParagraphs[0]}
            </motion.p>

            {/* React Bits Official StrokeText Component Stats Block (Center Aligned) */}
            <motion.div
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="py-2 space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold block text-center">
                [ WORKED WITH ]
              </span>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 items-baseline">
                <div className="flex flex-col items-center text-center space-y-1">
                  <StrokeText
                    text="50+"
                    strokeColor="#000000"
                    fillColor="#000000"
                    strokeWidth={2}
                    drawDuration={1.2}
                    fillDelay={0.2}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={isMobile ? 42 : 64}
                    fontWeight={900}
                    letterSpacing={-2}
                  />
                  <span className="text-xs sm:text-sm font-mono font-extrabold tracking-wider text-neutral-800 uppercase block text-center">
                    Creators
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <StrokeText
                    text="13+"
                    strokeColor="#000000"
                    fillColor="#000000"
                    strokeWidth={2}
                    drawDuration={1.2}
                    fillDelay={0.2}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={isMobile ? 42 : 64}
                    fontWeight={900}
                    letterSpacing={-2}
                  />
                  <span className="text-xs sm:text-sm font-mono font-extrabold tracking-wider text-neutral-800 uppercase block text-center">
                    Countries
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <StrokeText
                    text="850M+"
                    strokeColor="#000000"
                    fillColor="#000000"
                    strokeWidth={2}
                    drawDuration={1.2}
                    fillDelay={0.2}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={isMobile ? 42 : 64}
                    fontWeight={900}
                    letterSpacing={-2}
                  />
                  <span className="text-xs sm:text-sm font-mono font-extrabold tracking-wider text-neutral-800 uppercase block text-center">
                    Views
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Remaining Paragraphs (Paragraph 1 & 2) */}
            {aboutParagraphs.slice(1).map((paragraphText, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: 0.2 + idx * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base sm:text-xl font-normal text-neutral-700 leading-relaxed"
              >
                {paragraphText}
              </motion.p>
            ))}

            {/* ReactBits Style Infinite Country Marquee Loop */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              <CountryLoop />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsorship Campaigns Section (Placed directly below About Us, white theme matching About Us) */}
      <section className="bg-white text-black pb-16 sm:pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-8 sm:mb-10 text-center">
          <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-black select-none text-center whitespace-normal sm:whitespace-nowrap px-2">
            Made Sponsorship Campaign as Video Editor for
          </h3>
        </div>

        {/* React Bits LogoLoop Infinite Marquee Component */}
        <div className="py-4">
          <LogoLoop
            logos={workedWithLogos}
            speed={isMobile ? 35 : 50}
            direction="left"
            logoHeight={isMobile ? 32 : 44}
            gap={isMobile ? 40 : 64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Worked with brands and partners"
          />
        </div>
      </section>

      {/* Section 3: Long Form Edits (Full Bleed Screen Width) */}
      <section
        id="our-work"
        className="min-h-screen bg-white text-black py-20 sm:py-28 relative overflow-hidden"
      >
        {/* Header inside exact 12-column grid matching About Us */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-4"
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none text-black">
                Long Form Edits
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Full Screen Width DriftWall Canvas - Scaled to fit all videos on mobile UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full h-[520px] sm:h-[850px] lg:h-[950px] relative"
        >
          <DriftWall
            items={workItems}
            columns={isMobile ? 3 : 6}
            tileWidth={isMobile ? 120 : 300}
            tileHeight={isMobile ? 78 : 195}
            gap={isMobile ? 10 : 24}
            tilt={isMobile ? 10 : 16}
            turn={isMobile ? -8 : -14}
            perspective={isMobile ? 850 : 1200}
            depth={isMobile ? 50 : 120}
            speed={isMobile ? 32 : 42}
            direction="up"
            variance={0.45}
            parallax={isMobile ? 0.3 : 0.6}
            lift={isMobile ? 24 : 64}
            fade={0.45}
            dim={0.88}
            overlayColor="#000000"
          />
        </motion.div>
      </section>

      {/* Section 4: Shorts & Reels (3D Depth Carousel) */}
      <section
        id="reels"
        className="min-h-screen bg-white text-black py-20 sm:py-28 relative overflow-hidden"
      >
        {/* Top & Bottom Seamless Section Blend Overlays */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-[5]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-[5]" />

        {/* Subtle Exploding Growth Arrow Background Graphic */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Red Ambient Light Glow */}
          <div className="absolute top-10 -right-1/4 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] bg-red-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 -left-1/4 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] bg-red-500/10 rounded-full blur-[120px]" />

          <motion.svg
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            whileInView={{ opacity: 0.22, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full max-w-7xl mx-auto will-change-transform"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="redArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#dc2626" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#b91c1c" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Glowing Exploding Straight Trend Line (2s Duration) */}
            <motion.path
              d="M 100,720 L 1050,140"
              stroke="url(#redArrowGrad)"
              strokeWidth="24"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Exploding Red Straight Arrow Head */}
            <motion.path
              d="M 920,135 L 1060,130 L 1045,270"
              stroke="url(#redArrowGrad)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* "VIEWS" Accent Text Positioned Above the Arrow */}
            <g transform="translate(850, 85)" className="font-mono font-black text-3xl tracking-widest fill-red-600/40 uppercase">
              <text x="0" y="0">VIEWS</text>
            </g>
          </motion.svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-8 sm:mb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-4"
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none text-black">
                Shorts & Reels
              </h2>
            </motion.div>
          </div>
        </div>

        {/* 3D Depth Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full relative z-10"
        >
          <DepthCarousel items={reelItems} />
        </motion.div>
      </section>

      {/* Section 5: Client Reviews */}
      <Reviews onFolderOpen={handleFolderOpen} />

      {/* Section 6: Contact Us */}
      <Contact />
    </motion.div>
  );
}
