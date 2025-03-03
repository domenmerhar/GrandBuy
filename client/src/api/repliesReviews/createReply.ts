import { toApiPath } from "../../functions/toApiPath";

/**
 * Doda odgovor na oceno izdelka.
 * @param {object} arguments - Argumenti za dodajanje odgovora.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.reviewId - ID ocene, na katero odgovarjamo.
 * @param {string} arguments.reply - Vsebina odgovora.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await replyToReview({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  reviewId: '123456',
 *  reply: 'Hvala za vašo oceno!'
 * });
 */

export default async ({
  JWT,
  reviewId,
  reply,
}: {
  JWT: string;
  reviewId: string;
  reply: string;
}) => {
  const body = JSON.stringify({ reply });

  const res = await fetch(toApiPath(`reply/review/${reviewId}`), {
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
