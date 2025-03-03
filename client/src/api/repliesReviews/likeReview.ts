import { toApiPath } from "../../functions/toApiPath";

/**
 * Všečka oceno s podanim ID-jem.
 * @param {object} arguments - Argumenti za všečkanje ocene.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.reviewId - ID ocene, ki jo želimo všečkati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await likeReview({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  reviewId: '123456'
 * });
 */

export default async ({ JWT, reviewId }: { JWT: string; reviewId: string }) => {
  const res = await fetch(toApiPath(`review/${reviewId}/like`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
