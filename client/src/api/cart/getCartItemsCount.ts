import { toApiPath } from "../../functions/toApiPath";

export const getCartItemsCount = async (JWT: string) => {
  const res = await fetch(toApiPath("cart/count"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
