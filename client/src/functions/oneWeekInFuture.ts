/**
 * oneWeekInFuture funkcija za izračun časovnega žiga en teden v prihodnosti.
 *
 * @returns {number} - Časovni žig en teden v prihodnosti (v milisekundah).
 *
 * @example
 * // Uporaba funkcije
 * const futureTimestamp = oneWeekInFuture();
 * console.log(futureTimestamp); // Izpis časovnega žiga
 */

export default function oneWeekInFuture() {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
}
