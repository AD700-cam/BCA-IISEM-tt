import { format, toDate } from 'date-fns-tz';

export const getPeriodStatus = (time: string): "Done" | "Ongoing" | "Pending" | "Starting Soon" => {
  const now = new Date();
  const timeZone = 'Asia/Kolkata';
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone }));
  const [startStr, endStr] = time.split(" - ");

  const [startHour, startMin] = startStr.split(":").map(Number);
  const [endHour, endMin] = endStr.split(":").map(Number);

  const currentHourIST = nowIST.getHours();
  const currentMinuteIST = nowIST.getMinutes();
  const currentTimeIST = currentHourIST * 60 + currentMinuteIST;

  const slotStart = startHour * 60 + startMin;
  const slotEnd = endHour * 60 + endMin;

  const totalMinutesInDay = 24 * 60;

  if (currentTimeIST >= slotEnd || slotEnd > totalMinutesInDay) {
    return "Done";
  } else if (currentTimeIST >= slotStart - 5 && currentTimeIST < slotStart) {
    return "Starting Soon";
  } else if (currentTimeIST >= slotStart && currentTimeIST < slotEnd) {
    return "Ongoing";
  } else {
    return "Pending";
  }
};

export const isStartingSoon = (time: string): boolean => {
  const now = new Date();
  const timeZone = 'Asia/Kolkata';
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone }));
  const [startStr] = time.split(" - ");
  const [startHour, startMin] = startStr.split(":").map(Number);

  const currentHourIST = nowIST.getHours();
  const currentMinuteIST = nowIST.getMinutes();
  const currentTimeIST = currentHourIST * 60 + currentMinuteIST;

  const slotStart = startHour * 60 + startMin;

  return currentTimeIST >= slotStart - 5 && currentTimeIST < slotStart;
};
