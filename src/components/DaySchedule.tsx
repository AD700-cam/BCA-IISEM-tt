import { motion } from 'framer-motion';
import { DaySchedule as DayScheduleType } from '../data/timetable';
import { TimeSlotCard } from './TimeSlotCard';

interface DayScheduleProps {
  schedule: DayScheduleType;
  isToday?: boolean;
}

export function DaySchedule({ schedule, isToday }: DayScheduleProps) {
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentTime = currentHour * 60 + currentMinutes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {schedule.slots.map((slot, index) => {
          const [startStr] = slot.time.split(" - ");
          const [startHour, startMin] = startStr.split(":").map(Number);
          const slotTime = startHour * 60 + startMin;
          
          const isActive = isToday && Math.abs(currentTime - slotTime) < 60;

          return (
            <TimeSlotCard
              key={index}
              slot={slot}
              isActive={isActive}
              index={index}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
