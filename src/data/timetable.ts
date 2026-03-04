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
      { time: "9:30 - 10:30", subject: "ENG - AK" },
      { time: "10:30 - 11:20", subject: "CN - BL" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "PYT - LAB - ARP" },
      { time: "12:30 - 1:30", subject: "PYT - LAB - ARP" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "AI - ABJ" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:30 - 10:30", subject: "AIA - ABJ" },
      { time: "10:30 - 11:20", subject: "CMV-2 - PN" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "ENG - RK" },
      { time: "12:30 - 1:30", subject: "KAN" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "PYT - ARP" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:30 - 10:30", subject: "AIA - ABJ" },
      { time: "10:30 - 11:20", subject: "ENG - RK" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "KAN" },
      { time: "12:30 - 1:30", subject: "PYT - ARP" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "CN - BL" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:30 - 10:30", subject: "AIA - LAB - ABJ" },
      { time: "10:30 - 11:20", subject: "AIA - LAB - ABJ" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "PYT - ARP" },
      { time: "12:30 - 1:30", subject: "ENG - RK" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "KAN" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:30 - 10:30", subject: "KAN" },
      { time: "10:30 - 11:20", subject: "CN - BL" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "FDS - NK" },
      { time: "12:30 - 1:30", subject: "SPORTS" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "PYT - ARP" }
    ]
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:30 - 10:30", subject: "AIA - ABJ" },
      { time: "10:30 - 11:20", subject: "CMV-2 - PN" },
      { time: "11:20 - 11:30", subject: "Break" },
      { time: "11:30 - 12:30", subject: "FDS - NK" },
      { time: "12:30 - 1:30", subject: "CN - BL" },
      { time: "1:30 - 2:00", subject: "Lunch Break" },
      { time: "2:00 - 3:00", subject: "No Class update the time table" }
    ]
  }
];

export const getCurrentDaySchedule = (): DaySchedule | undefined => {
  const now = new Date();
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const today = nowIST.getDay();
  return timetableData[today === 0 ? 5 : today - 1];
};

export const getCurrentTimeSlot = (): TimeSlot | undefined => {
  const now = new Date();
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const schedule = getCurrentDaySchedule();
  if (!schedule) return undefined;

  const currentTime = nowIST.getHours() * 60 + nowIST.getMinutes();

  return schedule.slots.find(slot => {
    const [startStr, endStr] = slot.time.split(" - ");
    const [startHour, startMin] = startStr.split(":").map(Number);
    const [endHour, endMin] = endStr.split(":").map(Number);

    const slotStart = startHour * 60 + startMin;
    const slotEnd = endHour * 60 + endMin;

    return currentTime >= slotStart && currentTime < slotEnd;
  });
};
