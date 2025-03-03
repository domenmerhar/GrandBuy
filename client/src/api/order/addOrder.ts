import { toApiPath } from "../../functions/toApiPath";

/**
 * Ustvari novo naročilo iz elementov košarice.
 * @param {object} arguments - Argumenti za ustvarjanje naročila.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string[]} arguments.cartItems - Array ID-jev elementov košarice, ki jih želimo vključiti v naročilo.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await addOrder({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItems: ['123456', '789012']
 * });
 */

export const addOrder = async ({
  JWT,
  cartItems,
}: {
  JWT: string;
  cartItems: string[];
}) => {
  const body = JSON.stringify({ cartItems });

  const res = await fetch(toApiPath(`order/`), {
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
