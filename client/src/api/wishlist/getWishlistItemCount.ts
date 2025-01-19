import { toApiPath } from "../../functions/toApiPath";

export const getWishlistItemCount = async (JWT: string) => {
  const res = await fetch(toApiPath(`wishlist/count`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
