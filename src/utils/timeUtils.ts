const parseTimeSlot = (timeStr: string): number => {
  const parts = timeStr.trim().split(/\s+/);
  const timePart = parts[0];
  const ampmPart = parts[1];

  let [hours, minutes] = timePart.split(':').map(Number);

  if (ampmPart === 'PM' && hours < 12) hours += 12;
  if (ampmPart === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export const getPeriodStatus = (time: string): "Done" | "Ongoing" | "Pending" => {
  const now = new Date();
  const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const [startStr, endStr] = time.split(" - ");

  const currentTimeIST = nowIST.getHours() * 60 + nowIST.getMinutes();

  const slotStart = parseTimeSlot(startStr);
  const slotEnd = parseTimeSlot(endStr);


  if (currentTimeIST >= slotEnd) {
    return "Done";
  } else if (currentTimeIST >= slotStart && currentTimeIST < slotEnd) {
    return "Ongoing";
  } else {
    return "Pending";
  }
};
