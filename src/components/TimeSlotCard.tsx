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
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        "p-3 rounded-lg shadow-lg transition-all duration-300 flex flex-col cursor-pointer",
        isActive
          ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
          : "bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
        "dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-2 mb-1">
        <Clock className={clsx("w-4 h-4", isActive ? "text-green-100" : "text-blue-400")} />
        <span className={clsx("text-xs", isActive ? "text-green-50" : "text-gray-400")}>
          {slot.time}
        </span>
      </div>
      <h3 className={clsx(
        "text-md font-semibold",
        isActive ? "text-white" : "text-gray-100"
      )}>
        {slot.subject}
      </h3>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <p className={clsx("text-xs", isActive ? "text-green-50" : "text-gray-300")}>
            {aiDescription}
          </p>
        </motion.div>
      )}
      <div className="mt-1 text-[0.6rem] text-gray-500 dark:text-gray-400 self-end">
        {periodStatus}
      </div>
    </motion.div>
  );
}
