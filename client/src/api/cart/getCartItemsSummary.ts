import { toApiPath } from "../../functions/toApiPath";

export const getCartItemsSummary = async ({
  JWT,
  cartItems,
}: {
  JWT: string;
  cartItems: string[];
}) => {
  if (cartItems.length === 0)
    return {
      status: "success",
      data: {
        items: 0,
        shipping: 0,
        discount: 0,
        total: 0,
      },
    };

  const cartItemsStr = cartItems.sort().join(",");

  const res = await fetch(toApiPath(`cart/summary/${cartItemsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
