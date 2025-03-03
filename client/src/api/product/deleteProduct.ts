import { toApiPath } from "../../functions/toApiPath";

/**
 * Izbriše izdelek s podanim ID-jem.
 * @param {object} arguments - Argumenti za brisanje izdelka.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.id - ID izdelka, ki ga želimo izbrisati.
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await deleteProduct({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  id: '123456'
 * });
 */

export const deleteProduct = async ({
  JWT,
  id,
}: {
  JWT: string;
  id: string;
}) => {
  const Authorization = `Bearer ${JWT}`;

  const response = await fetch(toApiPath(`product/${id}`), {
    method: "DELETE",
    headers: {
      Authorization,
    },
  });

  const data = await response.json();
  return data;
};
