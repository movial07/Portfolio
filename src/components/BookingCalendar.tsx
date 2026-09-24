'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingCalendarProps {
  calendlyUrl?: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  calendlyUrl = 'https://calendly.com/movial-gro/30min',
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(12);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  // Days in August 2026
  const availableDates = [12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31];

  const timeSlots12h = ['9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm'];
  const timeSlots24h = ['21:00', '21:30', '22:00', '22:30', '23:00'];
  const activeTimeSlots = timeFormat === '12h' ? timeSlots12h : timeSlots24h;

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // August 2026 starts on Saturday (day 6 index)
  // Grid layout for dates 1 to 31
  const daysGrid = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto bg-white text-black rounded-3xl border border-neutral-200/90 shadow-2xl p-6 sm:p-8 select-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Column 1: Meeting Info (Left) */}
        <div className="md:col-span-3 space-y-5 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0">
          <div className="flex items-center gap-3">
            <img
              src="/movial-logo.png"
              alt="Movial Avatar"
              className="w-12 h-12 rounded-full object-cover border border-neutral-200 shadow-sm"
            />
            <div>
              <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-wider block">
                Host
              </span>
              <span className="text-base font-bold text-black font-sans">
                Movial
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-neutral-900 leading-tight">
              Discovery Call
            </h3>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm font-medium text-neutral-600 font-sans">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">☑</span>
              <span>Requires confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">⏱</span>
              <span>30m</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">📹</span>
              <span>Google Meet</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors pt-1">
              <span>🌐</span>
              <span className="font-semibold text-neutral-800">Asia/Kolkata</span>
              <span className="text-[10px] text-neutral-400">▼</span>
            </div>
          </div>
        </div>

        {/* Column 2: Date Picker (Center) */}
        <div className="md:col-span-6 px-0 md:px-4 space-y-4 border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0">
          {/* Header Month / Nav */}
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold font-sans text-neutral-900">
              August <span className="text-neutral-400 font-normal">2026</span>
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black transition-colors text-sm"
              >
                ‹
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-black transition-colors text-sm"
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekdays Header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((d) => (
              <span key={d} className="text-[11px] font-bold text-neutral-400 tracking-wider">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center pt-2">
            {/* Offset for Saturday (6 empty cells) */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={`empty-${idx}`} />
            ))}

            {daysGrid.map((day) => {
              const isAvailable = availableDates.includes(day);
              const isSelected = selectedDate === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => isAvailable && setSelectedDate(day)}
                  disabled={!isAvailable}
                  className={`h-10 sm:h-11 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all flex items-center justify-center relative ${
                    isSelected
                      ? 'bg-[#1c1c1c] text-white shadow-md font-bold scale-105'
                      : isAvailable
                      ? 'bg-neutral-100/90 text-neutral-900 hover:bg-neutral-200/80 cursor-pointer'
                      : 'text-neutral-300 cursor-not-allowed'
                  }`}
                >
                  {day}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white absolute bottom-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 3: Time Slots (Right) */}
        <div className="md:col-span-3 space-y-4 pl-0 md:pl-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold font-sans text-neutral-900">
              Wed {selectedDate}
            </span>
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setTimeFormat('12h')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  timeFormat === '12h' ? 'bg-white font-bold shadow-xs text-black' : 'text-neutral-500'
                }`}
              >
                12h
              </button>
              <button
                type="button"
                onClick={() => setTimeFormat('24h')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  timeFormat === '24h' ? 'bg-white font-bold shadow-xs text-black' : 'text-neutral-500'
                }`}
              >
                24h
              </button>
            </div>
          </div>

          {/* Time Buttons */}
          <div className="space-y-2 pt-1">
            {activeTimeSlots.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeClick(time)}
                  className={`w-full py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold font-mono transition-all flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-neutral-200/90 text-neutral-800 hover:border-black hover:bg-neutral-50'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;
