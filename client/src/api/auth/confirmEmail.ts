import { toApiPath } from "../../functions/toApiPath";

interface ConfirmProps {
  email: string;
  verificationCode: string;
}

/**
/**
 * Potrdi e-poštni naslov uporabnika s pomočjo verifikacijske kode.
 * @param {object} arguments - Argumenti za potrditev e-pošte.
 * @param {string} arguments.email - E-poštni naslov uporabnika.
 * @param {string} arguments.verificationCode - Verifikacijska koda za potrditev.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await confirmEmail({
 *  email: 'uporabnik@primer.com',
 *  verificationCode: '123456'
 * });
 */

export const confirmEmail = async ({
  email,
  verificationCode,
}: ConfirmProps) => {
  const body = JSON.stringify({ email });

  const response = await fetch(
    toApiPath(`user/confirm-email/${verificationCode}`),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }
  );

  const data = await response.json();
  return data;
};
