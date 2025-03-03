import { toApiPath } from "../../functions/toApiPath";

/**
 * Odjavi uporabnika s podanim JWT žetonom.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await logout('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */
export const logout = async (JWT: string) => {
  const response = await fetch(toApiPath("user/logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();
  return data;
};
