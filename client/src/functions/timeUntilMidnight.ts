import { iTime } from "../Util/types";

/**
 * timeUntilMidnight funkcija za izračun preostalega časa do polnoči.
 *
 * @returns {iTime} - Objekt, ki vsebuje preostale ure, minute in sekunde do polnoči.
 *
 * @example
 * // Uporaba funkcije
 * const timeLeft = timeUntilMidnight();
 * console.log(timeLeft); // Izpis objekta z preostalim časom
 */

export const timeUntilMidnight: () => iTime = () => {
  const midnight = new Date();
  midnight.setHours(24);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);

  const sUntilMidnight = (midnight.getTime() - new Date().getTime()) / 1000;

  const hoursUntilMidnight = Math.floor(sUntilMidnight / 3600);
  const minutesUntilMidnight = Math.floor(sUntilMidnight / 60) % 60;
  const secondsUntilMidnight = Math.floor(sUntilMidnight) % 60;

  return { hoursUntilMidnight, minutesUntilMidnight, secondsUntilMidnight };
};
