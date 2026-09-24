'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BookingCalendar from './BookingCalendar';

export const Contact: React.FC = () => {
  const whatsappNumber = '+91 99902 24708';
  const whatsappUrl = 'https://wa.me/919990224708?text=Hi%20Veeral,%20I%27d%20love%20to%20discuss%20a%20video%20editing%20project!';
  const emailAddress = 'movial.gro@gmail.com';
  const emailUrl = 'mailto:movial.gro@gmail.com?subject=Video%20Editing%20Inquiry%20-%20Movial';
  const instagramHandle = '@movial.gro';
  const instagramUrl = 'https://www.instagram.com/movial.gro';

  const calendlyUrl = 'https://calendly.com/movial-gro/30min';

  const channels = [
    {
      id: 'email',
      detail: emailAddress,
      href: emailUrl,
      icon: (
        <svg className="w-8 h-8 fill-neutral-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      detail: instagramHandle,
      href: instagramUrl,
      icon: (
        <svg className="w-8 h-8 fill-[#E4405F]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      detail: 'WhatsApp',
      href: whatsappUrl,
      icon: (
        <svg className="w-8 h-8 fill-[#25D366]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.004 2C6.48 2 2.004 6.478 2.004 12c0 1.767.462 3.488 1.34 5.008L2 22l5.127-1.344A9.957 9.957 0 0 0 12.004 22c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 18.286c-1.543 0-3.048-.415-4.364-1.2l-.313-.186-3.242.85.865-3.16-.204-.326A8.256 8.256 0 0 1 3.718 12c0-4.568 3.718-8.286 8.286-8.286 4.568 0 8.286 3.718 8.286 8.286 0 4.568-3.718 8.286-8.286 8.286zm4.538-6.195c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.049-.387-1.998-1.233-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.506.112-.111.248-.29.373-.435.124-.145.166-.248.248-.414.083-.166.041-.311-.02-.435-.063-.124-.56-1.35-.767-1.85-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.87 0.85-.87 2.073 0 1.223.891 2.405 1.015 2.571.124.166 1.753 2.678 4.248 3.755.593.256 1.056.41 1.417.525.596.19 1.138.163 1.567.099.478-.071 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen bg-white text-black py-16 sm:py-24 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Header inside exact 12-column grid matching Long Form Edits */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-6 sm:mb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-4"
          >
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none select-none text-black">
              Contact Us
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Full Width Content Layout Matching Long Form Edits Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 w-full space-y-8 sm:space-y-10 my-auto">
        {/* Official Live Calendly Widget (Native 3-Column Layout & Direct Booking) */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-white p-1 sm:p-2 relative"
        >
          <iframe
            src="https://calendly.com/movial-gro/30min?hide_gdpr_banner=1"
            width="100%"
            height="660"
            frameBorder="0"
            scrolling="no"
            className="w-full rounded-2xl h-[640px] sm:h-[660px] overflow-hidden"
            title="Book a 30 Minute Meeting with Movial"
          />
        </motion.div>

        {/* 3 Contact Cards Layout Below Calendly Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {channels.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0f1117] text-white p-8 sm:p-10 rounded-3xl border border-neutral-800 flex flex-col justify-between gap-8 shadow-xl hover:border-neutral-700 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* SVG Repo Icon Header */}
                <div className="flex items-center justify-between">
                  {ch.icon}
                </div>

                {/* Contact Detail with Melody Variable Font */}
                <p className="font-melody font-bold text-xl sm:text-2xl text-white tracking-wide break-all">
                  {ch.detail}
                </p>
              </div>

              {/* Uniform OPEN Button Pill Across All 3 Channels */}
              <a
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between font-bold font-mono text-xs px-6 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all duration-300 group/btn"
              >
                <span>OPEN</span>
                <span className="group-hover/btn:translate-x-1 transition-transform ml-2">↗</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-12 border-t border-neutral-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-black lowercase tracking-tight">movial</span>
            <span>© {new Date().getFullYear()} Movial. All Rights Reserved.</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-black transition-colors cursor-pointer uppercase tracking-widest flex items-center gap-2 font-bold"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
