'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const whatsappNumber = '+91 99902 24708';
  const whatsappUrl = 'https://wa.me/919990224708?text=Hi%20Veeral,%20I%27d%20love%20to%20discuss%20a%20video%20editing%20project!';
  const emailAddress = 'movial.gro@gmail.com';
  const emailUrl = 'mailto:movial.gro@gmail.com?subject=Video%20Editing%20Inquiry%20-%20Movial';
  const instagramHandle = '@movial.gro';
  const instagramUrl = 'https://www.instagram.com/movial.gro';

  const channels = [
    {
      id: 'whatsapp',
      detail: whatsappNumber,
      href: whatsappUrl,
      icon: (
        <svg className="w-8 h-8 fill-[#25D366] shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
    },
    {
      id: 'email',
      detail: emailAddress,
      href: emailUrl,
      icon: (
        <svg className="w-8 h-8 fill-neutral-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
    {
      id: 'instagram',
      detail: instagramHandle,
      href: instagramUrl,
      icon: (
        <svg className="w-8 h-8 fill-[#E4405F]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen bg-white text-black py-20 sm:py-28 relative overflow-hidden flex flex-col justify-between"
    >
      {/* Header inside exact 12-column grid matching Long Form Edits */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-8 sm:mb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
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
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 w-full space-y-12 my-auto">
        {/* Lead Statement */}
        <motion.p
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl font-medium text-black leading-relaxed border-l-2 border-black pl-6 max-w-4xl"
        >
          Have a project in mind or want to collaborate? Reach out directly to discuss video editing, storytelling, or custom visual cuts.
        </motion.p>

        {/* 3 Contact Cards Layout Spanning Full Container Width */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {channels.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
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
