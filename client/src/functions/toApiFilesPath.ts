/**
 * toApiFilesPath funkcija za ustvarjanje URL-ja do datoteke na API-ju ali do nadomestne slike.
 *
 * @param {string | undefined} file - Ime datoteke ali undefined.
 * @returns {string} - URL do datoteke na API-ju ali do nadomestne slike.
 *
 * @example
 * // Uporaba funkcije
 * const imageUrl = toApiFilesPath("example.jpg");
 */

export const toApiFilesPath = (file: string | undefined) =>
  file
    ? `${import.meta.env.VITE_API_LINK}/files/${file}`
    : import.meta.env.VITE_PLACEHOLDER_IMAGE;
