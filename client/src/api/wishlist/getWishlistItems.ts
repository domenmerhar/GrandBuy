import { toApiPath } from "../../functions/toApiPath";

export const getWishlistItems = async ({
  JWT,
  page,
  from,
  to,
  sale,
}: {
  JWT: string;
  page: number;
  sale?: boolean;
  from?: number;
  to?: number;
}) => {
  const limit = Number(import.meta.env.VITE_PRODUCTS_PER_STEPPER);

  const queryParamsStr = [
    limit && `limit=${limit}`,
    page && `page=${page}`,
    sale && "discount[gt]=0",
    from && `totalPrice[gte]=${from}`,
    to && `totalPrice[lte]=${to}`,
  ]
    .filter((param) => !!param)
    .join("&");

  const res = await fetch(toApiPath(`wishlist?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  console.log(toApiPath(`wishlist?${queryParamsStr}`));

  const data = await res.json();

  return data;
};
