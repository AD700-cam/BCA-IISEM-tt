import { useEffect, useState } from 'react';

// ─── Core Helpers ────────────────────────────────────────────────────────────

/**
 * Parse a time string like "9:30 AM" into total minutes since midnight.
 * This is the single canonical implementation — timetable.ts imports it too.
 */
export const parseTimeSlot = (timeStr: string): number => {
  const parts = timeStr.trim().split(/\s+/);
  const [timePart, ampmPart] = parts;
  let [hours, minutes] = timePart.split(':').map(Number);

  if (ampmPart === 'PM' && hours < 12) hours += 12;
  if (ampmPart === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

/**
 * Returns the current IST time as minutes since midnight.
 * Avoids creating two Date objects on every call by doing the conversion once.
 */
export const getISTMinutes = (): number => {
  const nowIST = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );
  return nowIST.getHours() * 60 + nowIST.getMinutes();
};

/**
 * Returns the current IST Date object.
 */
export const getNowIST = (): Date =>
  new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

// ─── Period Status ────────────────────────────────────────────────────────────

/**
 * Determine whether a slot is Done / Ongoing / Pending.
 * Accepts pre-computed `nowMinutes` so the caller controls the clock —
 * this keeps components pure and makes the live-update hook the single
 * source of truth.
 */
export const getPeriodStatus = (
  time: string,
  nowMinutes: number
): 'Done' | 'Ongoing' | 'Pending' => {
  const [startStr, endStr] = time.split(' - ');
  const slotStart = parseTimeSlot(startStr);
  const slotEnd = parseTimeSlot(endStr);

  if (nowMinutes >= slotEnd) return 'Done';
  if (nowMinutes >= slotStart) return 'Ongoing';
  return 'Pending';
};

// ─── Live Clock Hook ──────────────────────────────────────────────────────────

/**
 * React hook that returns the current IST time in minutes, updated every
 * 30 seconds. Drive all period-status badges from this single hook so
 * the whole UI stays in sync without each card polling independently.
 */
export const useNowIST = (): number => {
  const [nowMinutes, setNowMinutes] = useState<number>(getISTMinutes);

  useEffect(() => {
    const tick = () => setNowMinutes(getISTMinutes());
    // Align the first tick to the next 30-second boundary so badges flip
    // exactly on time rather than drifting by however many seconds remain.
    const msUntilNextHalfMinute = 30_000 - (Date.now() % 30_000);
    const initialTimer = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 30_000);
      return () => clearInterval(interval);
    }, msUntilNextHalfMinute);

    return () => clearTimeout(initialTimer);
  }, []);

  return nowMinutes;
};
