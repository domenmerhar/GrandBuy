import { toApiPath } from "../../functions/toApiPath";

/**
 * Zahteva vračilo izdelka s podanim ID-jem elementa košarice.
 * @param {object} arguments - Argumenti za zahtevo vračila.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} arguments.cartItemId - ID elementa košarice, za katerega želimo zahtevati vračilo.
 * @param {string} arguments.reason - Razlog za vračilo.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await requestRefund({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  cartItemId: '123456',
 *  reason: 'Izdelek je poškodovan.'
 * });
 */

export const requestRefund = async ({
  JWT,
  cartItemId,
  reason,
}: {
  JWT: string;
  cartItemId: string;
  reason: string;
}) => {
  const body = JSON.stringify({ reason });

  const res = await fetch(toApiPath(`refund/product/${cartItemId}`), {
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
