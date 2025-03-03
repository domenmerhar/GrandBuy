import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi število neprebranih obvestil uporabnika.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getNotificationCount('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const getNotificationCount = async (JWT: string) => {
  const res = await fetch(toApiPath("notification/count"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
