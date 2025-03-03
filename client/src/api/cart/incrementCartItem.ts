import { toApiPath } from "../../functions/toApiPath";

/**
 * Poveča količino izdelka v košarici za 1.
 * @param {object} arguments - Argumenti za povečanje količine izdelka v košarici.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.cartItemId - ID elementa košarice, ki ga želimo povečati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await incrementCartItem({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItemId: '123456'
 * });
 */

export const incrementCartItem = async ({
  JWT,
  cartItemId,
}: {
  JWT: string;
  cartItemId: string;
}) => {
  const res = await fetch(toApiPath(`cart/increment/${cartItemId}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
