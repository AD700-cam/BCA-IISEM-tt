import { parseTimeSlot, getISTMinutes, getNowIST } from '../utils/timeUtils';

export interface TimeSlot {
  time: string;
  subject: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export const timetableData: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '9:30 AM - 10:30 AM',  subject: 'WT – ARV' },
      { time: '10:30 AM - 11:30 AM', subject: 'SE – SR' },
      { time: '11:30 AM - 12:30 PM', subject: 'ETP – RK' },
      { time: '12:30 PM - 1:30 PM',  subject: 'DM – ARP' },
      { time: '1:30 PM - 2:00 PM',   subject: 'Lunch Break' },
      { time: '2:00 PM - 3:00 PM',   subject: 'IS – SR' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '9:30 AM - 10:30 AM',  subject: 'SE – SR' },
      { time: '10:30 AM - 11:30 AM', subject: 'LIB' },
      { time: '11:30 AM - 12:30 PM', subject: 'WT Lab – ARV' },
      { time: '12:30 PM - 1:30 PM',  subject: 'Lunch Break' },
      { time: '2:00 PM - 3:00 PM',   subject: 'DM – ARP' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '9:30 AM - 10:30 AM',  subject: 'WT – ARV' },
      { time: '10:30 AM - 11:30 AM', subject: 'SE – SR' },
      { time: '11:30 AM - 12:30 PM', subject: 'DM – ARP' },
      { time: '12:30 PM - 1:30 PM',  subject: 'Sports' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '9:30 AM - 10:30 AM',  subject: 'DM – ARP' },
      { time: '10:30 AM - 11:30 AM', subject: 'SE – SR' },
      { time: '11:30 AM - 12:30 PM', subject: 'DM Lab – ARP' },
      { time: '12:30 PM - 1:30 PM',  subject: 'Lunch Break' },
      { time: '2:00 PM - 3:00 PM',   subject: 'WT – ARV' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '9:30 AM - 10:30 AM',  subject: 'WT – ARV' },
      { time: '10:30 AM - 11:30 AM', subject: 'IS – SR' },
      { time: '11:30 AM - 12:30 PM', subject: 'DA Lab – KSN' },
    ],
  },
  {
    day: 'Saturday',
    slots: [],          // No classes — renders an empty-day placeholder
  },
];

// ─── Day helpers ─────────────────────────────────────────────────────────────

/** Maps JS getDay() (0=Sun … 6=Sat) to our timetableData index (0=Mon … 5=Sat). */
export const todayIndex = (): number => {
  const day = getNowIST().getDay();   // 0 = Sunday
  if (day === 0) return -1;           // Sunday → no classes
  return day - 1;                     // Mon=0 … Sat=5
};

export const getCurrentDaySchedule = (): DaySchedule | undefined => {
  const idx = todayIndex();
  return idx >= 0 ? timetableData[idx] : undefined;
};

export const getCurrentTimeSlot = (): TimeSlot | undefined => {
  const schedule = getCurrentDaySchedule();
  if (!schedule) return undefined;

  const now = getISTMinutes();
  return schedule.slots.find(slot => {
    const [startStr, endStr] = slot.time.split(' - ');
    return now >= parseTimeSlot(startStr) && now < parseTimeSlot(endStr);
  });
};
