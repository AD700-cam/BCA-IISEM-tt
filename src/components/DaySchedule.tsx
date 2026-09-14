import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { DaySchedule as DayScheduleType } from '../data/timetable';
import { TimeSlotCard } from './TimeSlotCard';
import { getCurrentTimeSlot } from '../data/timetable';

interface DayScheduleProps {
  schedule: DayScheduleType;
  isToday?: boolean;
  nowMinutes: number;   // live clock value from parent's useNowIST()
}

export function DaySchedule({ schedule, isToday, nowMinutes }: DayScheduleProps) {
  const currentTimeSlot = isToday ? getCurrentTimeSlot() : undefined;

  // ── Empty day (Saturday / holiday) ────────────────────────────────────────
  if (schedule.slots.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 gap-5"
      >
        <div className="p-5 rounded-2xl bg-blue-500/10 text-blue-400">
          <Coffee className="w-10 h-10" />
        </div>
        <p className="text-gray-400 text-lg font-medium">No classes today</p>
        <p className="text-gray-600 text-sm">Rest up, enjoy your free day 🎉</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {schedule.slots.map((slot, index) => {
          const isActive = Boolean(isToday && currentTimeSlot?.time === slot.time);

          return (
            <TimeSlotCard
              key={`${slot.time}-${index}`}
              slot={slot}
              isActive={isActive}
              index={index}
              nowMinutes={nowMinutes}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
