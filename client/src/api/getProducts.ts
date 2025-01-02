import { toApiPath } from "../functions/toApiPath";

export const getProducts = async ({
  query,
  page,
  freeShipping,
  sale,
  from,
  to,
  rating,
}: {
  query: string;
  page: number;
  freeShipping?: boolean;
  sale?: boolean;
  rating?: number;
  from?: number;
  to?: number;
}) => {
  const queryParamsStr = [
    freeShipping && "shipping[lte]=0",
    sale && "discount[gt]=0",
    from && `totalPrice[gte]=${from}`,
    to && `totalPrice[lte]=${to}`,
    rating && `averageRating=${rating}`,
  ]
    .filter((param) => !!param)
    .join("&");

  const queryParams = queryParamsStr ? `&${queryParamsStr}` : "";

  const response = await fetch(
    toApiPath(`product?search=${query}&page=${page}${queryParams}`)
  );

  const data = await response.json();
  return data;
};
