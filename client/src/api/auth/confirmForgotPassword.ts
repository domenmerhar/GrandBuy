import { toApiPath } from "../../functions/toApiPath";

/**
 * Potrdi pozabljeno geslo uporabnika s pomočjo verifikacijske kode.
 * @param {object} arguments - Argumenti za potrditev pozabljenega gesla.
 * @param {string} arguments.email - E-poštni naslov uporabnika.
 * @param {number} arguments.verificationCode - Verifikacijska koda za potrditev.
 * @param {string} arguments.password - Novo geslo.
 * @param {string} arguments.confirmPassword - Potrditev novega gesla.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await confirmForgotPassword({
 *  email: 'uporabnik@primer.com',
 *  verificationCode: 123456,
 *  password: 'NovoGeslo123',
 *  confirmPassword: 'NovoGeslo123'
 * });
 */

export default async function confirmForgotPassword({
  email,
  verificationCode,
  password,
  confirmPassword,
}: {
  email: string;
  verificationCode: number;
  password: string;
  confirmPassword: string;
}) {
  const body = JSON.stringify({
    email,
    verificationCode,
    password,
    confirmPassword,
  });

  const response = await fetch(toApiPath(`user/confirm-forgot-password`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
