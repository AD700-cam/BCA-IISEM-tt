export interface TimeSlot {
  time: string;
  subject: string;
  teacher?: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export const timetableData: DaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { time: "9:30 - 10:30", subject: "ENG - RAJ" },
      { time: "10:30 - 11:20", subject: "DAA - CPK" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "SPORTS" },
      { time: "12:30 - 1:30", subject: "JAVA - KM" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "DB - BL" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:30 - 10:30", subject: "IOT - PPS" },
      { time: "10:30 - 11:20", subject: "ENG - RAJ" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "DAA - CPK" },
      { time: "12:30 - 1:30", subject: "KAN/HIN" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "DB - BL" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:30 - 10:30", subject: "DB - BL" },
      { time: "10:30 - 11:20", subject: "JAVA - KM" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "KAN/HIN" },
      { time: "12:30 - 1:30", subject: "IOT - GA" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00", subject: "LET OFF" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:30 - 10:30", subject: "DB - LAB - BL" },
      { time: "10:30 - 11:20", subject: "DB - LAB - BL" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "JAVA - KM" },
      { time: "12:30 - 1:30", subject: "DAA - CPK" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "KAN/HIN" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:30 - 10:30", subject: "KAN/HIN" },
      { time: "10:30 - 11:20", subject: "ENG - RAJ" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "DB - BL" },
      { time: "12:30 - 1:30", subject: "JAVA - KM" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:45", subject: "JAVA - LAB - KM/GA" }
    ]
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:30 - 10:30", subject: "ENG - RAJ" },
      { time: "10:30 - 11:20", subject: "DAA - CPK" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "UNIX - LAB - KSN" },
      { time: "12:30 - 1:30", subject: "KAN/HIN" },
      { time: "1:30 - 2:00", subject: "LUNCH" },
      { time: "2:00", subject: "LET-OFF" }
    ]
  }
];

export const getCurrentDaySchedule = (): DaySchedule | undefined => {
  const today = new Date().getDay();
   return timetableData[today === 0 ? 5 : today - 1];
};

export const getCurrentTimeSlot = (): TimeSlot | undefined => {
  const now = new Date();
  const schedule = getCurrentDaySchedule();
  if (!schedule) return undefined;

  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  return schedule.slots.find(slot => {
    const [startStr, endStr] = slot.time.split(" - ");
    const [startHour, startMin] = startStr.split(":").map(Number);
    const [endHour, endMin] = endStr.split(":").map(Number);
    
    const slotStart = startHour * 60 + startMin;
    const slotEnd = endHour * 60 + endMin;
    
    return currentTime >= slotStart && currentTime < slotEnd;
  });
};
