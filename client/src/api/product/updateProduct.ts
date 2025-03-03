import { toApiPath } from "../../functions/toApiPath";

/**
 * Posodobi izdelek s podanim ID-jem.
 * @param {object} arguments - Argumenti za posodobitev izdelka.
 * @param {string} arguments.JWT - JWT (JSON Web Token) prodajalca.
 * @param {string} arguments.productId - ID izdelka, ki ga želimo posodobiti.
 * @param {string} [arguments.name] - Novo ime izdelka (neobvezno).
 * @param {number} [arguments.price] - Nova cena izdelka (neobvezno).
 * @param {number} [arguments.discount] - Nov popust izdelka (neobvezno).
 * @param {number} [arguments.shipping] - Novi stroški pošiljanja izdelka (neobvezno).
 * @param {File[]} [arguments.images] - Array novih slik izdelka (File objekti, neobvezno).
 * @param {File} [arguments.coverImage] - Nova naslovna slika izdelka (File objekt, neobvezno).
 * @param {File} [arguments.description] - Nov opis izdelka (File objekt, neobvezno).
 * @returns {Promise<any>} - Odgovor strežnika.
 * @async
 * @throws {Error} - V primeru, da niso podani nobeni podatki za posodobitev.
 * @example
 * await updateProduct({
 *  JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *  productId: '123456',
 *  name: 'Posodobljen Izdelek',
 *  price: 120,
 *  images: [file1]
 * });
 */

export const updateProduct = async ({
  JWT,
  productId,
  name,
  price,
  discount,
  shipping,
  images,
  coverImage,
  description,
}: {
  JWT: string;
  productId: string;
  name?: string;
  price?: number;
  discount?: number;
  shipping?: number;
  images?: File[];
  coverImage?: File;
  description?: File;
}) => {
  if (
    !name &&
    !price &&
    !discount &&
    !shipping &&
    !images?.length &&
    !coverImage &&
    !description
  )
    throw new Error("Please enter at leas one field.");

  const Authorization = `Bearer ${JWT}`;

  const formData = new FormData();
  if (name) formData.append("name", name);
  if (price) formData.append("price", price.toString());
  if (discount) formData.append("discount", discount.toString());
  if (shipping) formData.append("shipping", shipping.toString());
  if (description) formData.append("description", description);
  if (coverImage) formData.append("coverImage", coverImage);

  if (images?.length)
    images.forEach((image) => {
      formData.append(`images`, image);
    });

  const response = await fetch(toApiPath(`product/${productId}`), {
    method: "PATCH",
    headers: {
      Authorization,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};
