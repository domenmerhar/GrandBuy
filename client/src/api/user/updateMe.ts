import { toApiPath } from "../../functions/toApiPath";

interface UpdateMeArguments {
  JWT: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
  image?: File;
}

/**
 * Posodobi podatke trenutno prijavljenega uporabnika.
 * @param {object} arguments - Argumenti za posodobitev uporabnika.
 * @param {string} arguments.JWT - JWT (JSON Web Token) uporabnika.
 * @param {string} [arguments.firstName] - Novo ime uporabnika (neobvezno).
 * @param {string} [arguments.lastName] - Nov priimek uporabnika (neobvezno).
 * @param {string} [arguments.street] - Nova ulica uporabnika (neobvezno).
 * @param {string} [arguments.city] - Novo mesto uporabnika (neobvezno).
 * @param {string} [arguments.zipCode] - Nova poštna številka uporabnika (neobvezno).
 * @param {string} [arguments.country] - Nova država uporabnika (neobvezno).
 * @param {string} [arguments.phoneNumber] - Nova telefonska številka uporabnika (neobvezno).
 * @param {File} [arguments.image] - Nova slika profila uporabnika (File objekt, neobvezno).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await updateMe({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  firstName: 'Janez',
 *  lastName: 'Novak',
 *  city: 'Ljubljana'
 * });
 */

export const updateMe = async ({
  JWT,
  firstName,
  city,
  lastName,
  country,
  phoneNumber,
  street,
  zipCode,
  image,
}: UpdateMeArguments) => {
  const formData = new FormData();
  if (firstName) formData.append("firstName", firstName);
  if (lastName) formData.append("lastName", lastName);
  if (street) formData.append("street", street);
  if (city) formData.append("city", city);
  if (zipCode) formData.append("zipCode", zipCode);
  if (country) formData.append("country", country);
  if (phoneNumber) formData.append("phoneNumber", phoneNumber);
  if (image) formData.append("image", image);

  const response = await fetch(toApiPath("user/me"), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
