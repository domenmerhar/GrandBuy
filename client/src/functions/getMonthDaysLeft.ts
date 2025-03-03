/**
 * getMonthDaysLeft funkcija za izračun števila dni, ki so še ostali v trenutnem mesecu.
 *
 * @returns {number} - Število dni, ki so še ostali v trenutnem mesecu.
 *
 * @example
 * // Uporaba funkcije
 * const daysLeft = getMonthDaysLeft();
 * console.log(daysLeft); // Izpis števila dni, ki so še ostali
 */

export const getMonthDaysLeft: () => number = () => {
  const date = new Date();
  return (
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
    date.getDate()
  );
};
