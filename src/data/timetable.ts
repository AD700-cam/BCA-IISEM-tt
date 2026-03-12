export interface TimeSlot {
  time: string;
  subject: string;
  teacher?: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

const parseTimeSlot = (timeStr: string): number => {
  const parts = timeStr.trim().split(/\s+/);
  const timePart = parts[0];
  const ampmPart = parts[1];

  let [hours, minutes] = timePart.split(':').map(Number);

  if (ampmPart === 'PM' && hours < 12) hours += 12;
  if (ampmPart === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export const timetableData: DaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "ENG - RK" },
      { time: "10:30 AM - 11:20 AM", subject: "CN - BL" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "PYT - LAB - ARP" },
      { time: "12:30 PM - 1:30 PM", subject: "PYT - LAB - ARP" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "AIA - ABJ" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "AIA - ABJ" },
      { time: "10:30 AM - 11:20 AM", subject: "CMV-2 - PN" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "ENG - RK" },
      { time: "12:30 PM - 1:30 PM", subject: "KAN" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "PYT - ARP" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "AIA - ABJ" },
      { time: "10:30 AM - 11:20 AM", subject: "ENG - RK" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "KAN" },
      { time: "12:30 PM - 1:30 PM", subject: "PYT - ARP" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "CN - BL" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "AIA - LAB - ABJ" },
      { time: "10:30 AM - 11:20 AM", subject: "AIA - LAB - ABJ" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "PYT - ARP" },
      { time: "12:30 PM - 1:30 PM", subject: "ENG - RK" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "KAN" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "KAN" },
      { time: "10:30 AM - 11:20 AM", subject: "CN - BL" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "FDS - NK" },
      { time: "12:30 PM - 1:30 PM", subject: "SPORTS" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "PYT - ARP" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
    ]
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:30 AM - 10:30 AM", subject: "AIA - ABJ" },
      { time: "10:30 AM - 11:20 AM", subject: "CMV-2 - PN" },
      { time: "11:20 AM - 11:30 AM", subject: "Break" },
      { time: "11:30 AM - 12:30 PM", subject: "FDS - NK" },
      { time: "12:30 PM - 1:30 PM", subject: "CN - BL" },
      { time: "1:30 PM - 2:00 PM", subject: "Lunch Break" },
      { time: "2:00 PM - 3:00 PM", subject: "-" },
      { time: "3:00 PM - 3:45 PM", subject: "-" }
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
    const slotStart = parseTimeSlot(startStr);
    const slotEnd = parseTimeSlot(endStr);

    return currentTime >= slotStart && currentTime < slotEnd;
  });
};
