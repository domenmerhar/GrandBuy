import { toApiPath } from "../../functions/toApiPath";

/**
 * Pridobi izdelek s podanim ID-jem.
 * @param {string} id - ID izdelka, ki ga želimo pridobiti.
 * @param {string} [JWT] - JWT (JSON Web Token) uporabnika (neobvezno).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await getProduct('123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 */

export const getProduct = async (id: string, JWT?: string) => {
  const Authorization = JWT ? `Bearer ${JWT}` : "";

  const response = await fetch(toApiPath(`product/${id}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  });
  const data = await response.json();
  return data;
};
