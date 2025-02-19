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
      { time: "9:30 - 10:30", subject: "KAN/HIN" },
      { time: "10:30 - 11:20", subject: "ENG - RK" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "DS - IN" },
      { time: "12:30 - 1:30", subject: "OS - SP" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "DS - IN" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:30 - 10:30", subject: "OS - SP" },
      { time: "10:30 - 11:20", subject: "RP - ARP" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "ENG - RK" },
      { time: "12:30 - 1:30", subject: "OS - SP" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "DS - IN" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:30 - 10:30", subject: "VAC" },
      { time: "10:30 - 11:20", subject: "RP - ARP" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "SPORTS" },
      { time: "12:30 - 1:30", subject: "DS - IN" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "KAN/HIN" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:30 - 10:30", subject: "IC - PK" },
      { time: "10:30 - 11:20", subject: "KAN/HIN" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "DS - LAB - IN" },
      { time: "12:30 - 1:30", subject: "-" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "DS - IN" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:30 - 10:30", subject: "RP - LAB - ARP" },
      { time: "10:30 - 11:20", subject: "-" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "VAC" },
      { time: "12:30 - 1:30", subject: "ENG - RK" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "RP - ARP" }
    ]
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:30 - 10:30", subject: "OS - SP" },
      { time: "10:30 - 11:20", subject: "RP - ARP" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "ENG - RK" },
      { time: "12:30 - 1:30", subject: "KAN/HIN" },
      { time: "1:30 - 2:00", subject: "-" },
      { time: "2:00 - 3:00", subject: "30M-B/LET-OFF After-2:00" }
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
