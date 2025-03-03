import { toApiPath } from "../../functions/toApiPath";

/**
 * Izbriše izdelek iz košarice.
 * @param {object} arguments - Argumenti za brisanje izdelka iz košarice.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.cartItemId - ID elementa košarice, ki ga želimo izbrisati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await deleteCartItem({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItemId: '123456'
 * });
 */
export const deleteCartItem = async ({
  JWT,
  cartItemId,
}: {
  JWT: string;
  cartItemId: string;
}) => {
  const res = await fetch(toApiPath(`cart/${cartItemId}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
