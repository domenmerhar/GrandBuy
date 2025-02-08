import { toApiPath } from "../../functions/toApiPath";

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
  JWT?: string;
  name: string;
  price: number;
  discount: number;
  shipping: number;
  images: File[];
  coverImage: File;
  description: File;
}) => {
  const Authorization = JWT ? `Bearer ${JWT}` : "";

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
