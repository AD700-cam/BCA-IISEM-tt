import { motion } from 'framer-motion';
import { DaySchedule as DayScheduleType, TimeSlot } from '../data/timetable';
import { TimeSlotCard } from './TimeSlotCard';
import { getCurrentTimeSlot } from '../data/timetable';
import { getPeriodStatus } from '../utils/timeUtils';

interface DayScheduleProps {
  schedule: DayScheduleType;
  isToday?: boolean;
}

export function DaySchedule({ schedule, isToday }: DayScheduleProps) {
  const currentTimeSlot = getCurrentTimeSlot();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {schedule.slots.map((slot, index) => {
          const periodStatus = getPeriodStatus(slot.time);
          const isActive = isToday && currentTimeSlot?.time === slot.time;

          return (
            <TimeSlotCard
              key={index}
              slot={slot}
              isActive={isActive}
              index={index}
              periodStatus={periodStatus}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
