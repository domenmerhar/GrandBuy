import { toApiPath } from "../../../functions/toApiPath";

/**
 * Funkcija za pridobivanje odgovorov na ocene.
 *
 * @async
 * @param {Object} parametri - Parametri funkcije.
 * @param {string} parametri.reviewId - ID ocene.
 * @param {number} parametri.page - Stran rezultatov (privzeto: 1).
 * @param {number} parametri.limit - Število rezultatov na stran (privzeto: 5).
 * @returns {Promise<Object>} Objek podatkov, pridobljenih iz API-ja.
 *
 * @example
 * // Uporaba funkcije
 * getReplies({ reviewId: "123", page: 1, limit: 5 }).then(data => console.log(data));
 */

export const getReplies = async ({
  reviewId,
  page = 1,
  limit = 5,
}: {
  reviewId: string;
  page: number;
  limit: number;
}) => {
  const res = await fetch(
    toApiPath(`reply/review/${reviewId}?page=${page}&limit=${limit}`)
  );
  const data = await res.json();
  return data;
};
