import { toApiPath } from "../../functions/toApiPath";

/**
 * Posodobi količino izdelka v košarici.
 * @param {object} arguments - Argumenti za posodobitev količine izdelka v košarici.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.cartItemId - ID elementa košarice, ki ga želimo posodobiti.
 * @param {number} arguments.quantity - Nova količina izdelka.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await updateCartItemQuantity({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItemId: '123456',
 *  quantity: 3
 * });
 */

export const updateCartItemQuantity = async ({
  JWT,
  cartItemId,
  quantity,
}: {
  JWT: string;
  cartItemId: string;
  quantity: number;
}) => {
  const body = JSON.stringify({ quantity });

  const res = await fetch(toApiPath(`cart/${cartItemId}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
