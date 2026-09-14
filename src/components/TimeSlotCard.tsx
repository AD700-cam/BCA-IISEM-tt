import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../data/timetable';
import { getPeriodStatus } from '../utils/timeUtils';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { getAiGeneratedDescription } from '../utils/aiDescriptions';

interface TimeSlotCardProps {
  slot: TimeSlot;
  isActive?: boolean;
  index: number;
  nowMinutes: number;   // driven by useNowIST() in parent — no per-card clock reads
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FREE_SLOT = '—';

/** Extract teacher code from "SUBJECT – TEACHER" → "TEACHER". Returns '' if none. */
const extractTeacher = (subject: string): string => {
  const parts = subject.split('–');
  return parts.length >= 2 ? parts[parts.length - 1].trim() : '';
};

const extractSubjectName = (subject: string): string => {
  const parts = subject.split('–');
  return parts[0].trim();
};

const isLabSlot = (subject: string) =>
  subject.toLowerCase().includes('lab');

const isBreakSlot = (subject: string) =>
  subject === 'Lunch Break' || subject === 'Break';

// ─── Component ────────────────────────────────────────────────────────────────

export function TimeSlotCard({ slot, isActive, index, nowMinutes }: TimeSlotCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiDescription, setAiDescription] = useState('');

  const periodStatus = getPeriodStatus(slot.time, nowMinutes);

  useEffect(() => {
    if (isExpanded) setAiDescription(getAiGeneratedDescription(slot.subject));
    else setAiDescription('');
  }, [isExpanded, slot.subject]);

  // ── Free-slot: render a compact dimmed chip, not a full card ──────────────
  if (slot.subject === FREE_SLOT) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="glass-card p-4 sm:p-5 border-white/5 flex items-center gap-3 opacity-30 cursor-default select-none"
      >
        <Clock className="w-3.5 h-3.5 text-gray-600 shrink-0" />
        <span className="text-xs text-gray-600 font-medium">{slot.time}</span>
        <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-gray-700 font-bold">
          Free
        </span>
      </motion.div>
    );
  }

  const teacher = extractTeacher(slot.subject);
  const subjectName = extractSubjectName(slot.subject);
  const lab = isLabSlot(slot.subject);
  const breakSlot = isBreakSlot(slot.subject);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!breakSlot ? { y: -4, scale: 1.01 } : {}}
      className={clsx(
        'glass-card p-4 sm:p-5 group flex flex-col relative overflow-hidden h-full min-h-[140px] transition-all duration-500',
        isActive
          ? 'border-blue-500 bg-blue-600/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50'
          : breakSlot
          ? 'border-white/5 opacity-60 cursor-default'
          : 'border-white/5 hover:border-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.03)] cursor-pointer'
      )}
      onClick={() => !breakSlot && setIsExpanded(e => !e)}
    >
      {/* Active pulse overlay */}
      {isActive && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
      )}

      {/* Live indicator dots */}
      {isActive && (
        <div className="absolute top-0 right-0 p-2 flex gap-1">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      )}

      {/* Lab badge */}
      {lab && (
        <span className="absolute top-2 left-2 text-[0.55rem] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold uppercase tracking-widest">
          Lab
        </span>
      )}

      {/* Time row */}
      <div className={clsx('flex items-center gap-2 mb-2 sm:mb-3', lab && 'mt-4')}>
        <div className={clsx(
          'p-1.5 rounded-lg',
          isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-500'
        )}>
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
        <span className={clsx(
          'text-[0.65rem] sm:text-xs font-semibold tracking-wider',
          isActive ? 'text-blue-300' : 'text-gray-500'
        )}>
          {slot.time}
        </span>
      </div>

      {/* Subject name */}
      <h3 className={clsx(
        'text-base sm:text-lg font-bold mb-2 transition-colors line-clamp-2',
        isActive
          ? 'text-white'
          : periodStatus === 'Done'
          ? 'text-gray-500'
          : 'text-gray-100 group-hover:text-blue-400'
      )}>
        {subjectName}
      </h3>

      {/* Bottom row: status + teacher chip */}
      <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-white/5">
        {!breakSlot && (
          <span className={clsx(
            'text-[0.6rem] sm:text-[0.65rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest transition-colors',
            periodStatus === 'Ongoing' ? 'bg-green-500/20 text-green-400' :
            periodStatus === 'Done'    ? 'bg-white/5 text-gray-600' :
                                         'bg-blue-500/10 text-blue-400'
          )}>
            {periodStatus}
          </span>
        )}

        {teacher && (
          <span className="ml-auto text-[0.6rem] sm:text-[0.65rem] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-semibold tracking-wide">
            {teacher}
          </span>
        )}
      </div>

      {/* Expandable AI description (not on break slots) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5"
        >
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {aiDescription}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
