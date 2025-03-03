/**
 * toApiPath funkcija za ustvarjanje URL-ja do API končne točke.
 *
 * @param {string} path - Pot do API končne točke.
 * @returns {string} - Celoten URL do API končne točke.
 *
 * @example
 * // Uporaba funkcije
 * const userUrl = toApiPath("users/123");
 * console.log(userUrl); // Izpis URL-ja do uporabnika z ID 123
 */

export const toApiPath = (path: string) =>
  `${import.meta.env.VITE_API_LINK}/${path}`.replace("+", "%2B");
