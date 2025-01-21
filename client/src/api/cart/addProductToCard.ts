import { toApiPath } from "../../functions/toApiPath";

export const addProductToCart = async ({
  JWT,
  productId,
  quantity,
}: {
  JWT: string;
  productId: string;
  quantity: number;
}) => {
  const body = JSON.stringify({ quantity });

  const res = await fetch(toApiPath(`cart/add/${productId}`), {
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
