import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi podatke o trenutno prijavljenem uporabniku.
 * @param {string} JWT - JWT (JSON Web Token) uporabnika.
 * @returns {Promise<any> | null} - Odgovor strežnika ali null, če JWT ni podan.
 * @async
 * @example
 * await getMe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const getMe = async (JWT: string) => {
  if (!JWT) return null;

  const res = await fetch(toApiPath(`user/me`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
