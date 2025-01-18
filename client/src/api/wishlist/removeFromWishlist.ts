import { toApiPath } from "../../functions/toApiPath";

export const removeFromWishlist = async ({
  productId,
  JWT,
}: {
  productId: string;
  JWT: string;
}) => {
  const res = await fetch(toApiPath(`wishlist/product/${productId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
