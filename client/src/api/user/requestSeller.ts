import { toApiPath } from "../../functions/toApiPath";

/**
 * Zahteva status prodajalca za trenutnega uporabnika.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await requestSeller('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const requestSeller = async (JWT: string) => {
  const response = await fetch(toApiPath("request/"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();
  return data;
};
