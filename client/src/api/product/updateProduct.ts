import { toApiPath } from "../../functions/toApiPath";

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
