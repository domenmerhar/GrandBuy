/**
 * toDate funkcija za pretvorbo ISO 8601 datuma v format "YYYY-MM-DD".
 *
 * @param {string} date - ISO 8601 datum (npr. "2024-03-15T10:30:00Z").
 * @returns {string} - Datum v formatu "YYYY-MM-DD" (npr. "2024-03-15").
 *
 * @example
 * // Uporaba funkcije
 * const formattedDate = toDate("2024-03-15T10:30:00Z");
 * console.log(formattedDate); // Izpis: "2024-03-15"
 */

export const toDate = (date: string) => date.split("T")[0];
