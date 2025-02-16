export const getPeriodStatus = (time: string): "Done" | "Ongoing" | "Pending" => {
  const now = new Date();
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
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
  } else if (currentTimeIST >= slotStart && currentTimeIST < slotEnd) {
    return "Ongoing";
  } else {
    return "Pending";
  }
};
