import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TimeSlot } from '../data/timetable';
import clsx from 'clsx';

interface TimeSlotCardProps {
  slot: TimeSlot;
  isActive?: boolean;
  index: number;
}

export function TimeSlotCard({ slot, isActive, index }: TimeSlotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        "p-4 rounded-lg shadow-lg transition-all duration-300",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-blue-500"
          : "bg-gray-800 hover:bg-gray-700"
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <Clock className={clsx("w-5 h-5", isActive ? "text-blue-200" : "text-blue-400")} />
        <span className={clsx("text-sm", isActive ? "text-blue-100" : "text-gray-400")}>
          {slot.time}
        </span>
      </div>
      <h3 className={clsx(
        "text-lg font-semibold",
        isActive ? "text-white" : "text-gray-100"
      )}>
        {slot.subject}
      </h3>
    </motion.div>
  );
}
