import { toApiPath } from "../../functions/toApiPath";

/**
 * Doda novo oceno za izdelek.
 * @param {object} arguments - Argumenti za dodajanje ocene.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.productId - ID izdelka, ki ga ocenjujemo.
 * @param {number} arguments.rating - Ocena izdelka (številka).
 * @param {string} arguments.review - Besedilo ocene.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await addProductReview({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  productId: '123456',
 *  rating: 5,
 *  review: 'Odličen izdelek!'
 * });
 */

export default async ({
  JWT,
  productId,
  rating,
  review,
}: {
  JWT: string;
  productId: string;
  rating: number;
  review: string;
}) => {
  const body = JSON.stringify({ rating, review });

  const res = await fetch(toApiPath(`review/product/${productId}`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
