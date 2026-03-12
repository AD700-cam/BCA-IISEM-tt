import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../data/timetable';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { getAiGeneratedDescription } from '../utils/aiDescriptions';

interface TimeSlotCardProps {
  slot: TimeSlot;
  isActive?: boolean;
  index: number;
  periodStatus: "Done" | "Ongoing" | "Pending";
}

export function TimeSlotCard({ slot, isActive, index, periodStatus }: TimeSlotCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiDescription, setAiDescription] = useState("");

  useEffect(() => {
    if (isExpanded) {
      setAiDescription(getAiGeneratedDescription(slot.subject));
    } else {
      setAiDescription("");
    }
  }, [isExpanded, slot.subject]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={clsx(
        "glass-card p-4 sm:p-5 group flex flex-col relative overflow-hidden h-full min-h-[140px] transition-all duration-500",
        isActive
          ? "border-blue-500 bg-blue-600/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50"
          : "border-white/5 hover:border-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.03)]"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isActive && (
        <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
      )}
      {isActive && (
        <div className="absolute top-0 right-0 p-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className={clsx(
          "p-1.5 rounded-lg",
          isActive ? "bg-blue-500/20 text-blue-300" : "bg-white/5 text-gray-500"
        )}>
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
        <span className={clsx(
          "text-[0.65rem] sm:text-xs font-semibold tracking-wider",
          isActive ? "text-blue-300" : "text-gray-500"
        )}>
          {slot.time}
        </span>
      </div>

      <h3 className={clsx(
        "text-base sm:text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2",
        isActive ? "text-white" : periodStatus === "Done" ? "text-gray-500" : "text-gray-100"
      )}>
        {slot.subject}
      </h3>

      <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-white/5">
        <span className={clsx(
          "text-[0.6rem] sm:text-[0.65rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest transition-colors",
          periodStatus === "Ongoing" ? "bg-green-500/20 text-green-400" :
            periodStatus === "Done" ? "bg-white/5 text-gray-700" :
              "bg-blue-500/10 text-blue-400"
        )}>
          {periodStatus}
        </span>
      </div>

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
