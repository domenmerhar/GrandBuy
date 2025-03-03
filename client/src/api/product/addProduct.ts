import { toApiPath } from "../../functions/toApiPath";

/**
 * Doda nov izdelek.
 * @param {object} arguments - Argumenti za dodajanje izdelka.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.name - Ime izdelka.
 * @param {number} arguments.price - Cena izdelka.
 * @param {number} arguments.discount - Popust izdelka (npr. 10 za 10%).
 * @param {number} arguments.shipping - Stroški pošiljanja izdelka.
 * @param {File[]} arguments.images - Array slik izdelka (File objekti).
 * @param {File} arguments.coverImage - Naslovna slika izdelka (File objekt).
 * @param {File} arguments.description - Opis izdelka (File objekt).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @example
 * await addProduct({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  name: 'Nov Izdelek',
 *  price: 100,
 *  discount: 10,
 *  shipping: 5,
 *  images: [file1, file2],
 *  coverImage: file3,
 *  description: file4
 * });
 */

export const addProduct = async ({
  JWT,
  name,
  price,
  discount,
  shipping,
  images,
  coverImage,
  description,
}: {
  JWT: string;
  name: string;
  price: number;
  discount: number;
  shipping: number;
  images: File[];
  coverImage: File;
  description: File;
}) => {
  const Authorization = `Bearer ${JWT}`;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("discount", discount.toString());
  formData.append("shipping", shipping.toString());
  formData.append("description", description);
  formData.append("coverImage", coverImage);

  images.forEach((image) => {
    formData.append(`images`, image);
  });

  const response = await fetch(toApiPath(`product/`), {
    method: "POST",
    headers: {
      Authorization,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
