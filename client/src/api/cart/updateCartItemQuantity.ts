import { toApiPath } from "../../functions/toApiPath";

export const updateCartItemQuantity = async ({
  JWT,
  cartItemId,
  quantity,
}: {
  JWT: string;
  cartItemId: string;
  quantity: number;
}) => {
  const body = JSON.stringify({ quantity });

  const res = await fetch(toApiPath(`cart/${cartItemId}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
