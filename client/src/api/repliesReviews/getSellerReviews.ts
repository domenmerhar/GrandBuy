import { toApiPath } from "../../functions/toApiPath";
import { SortCreatedAt } from "../../Util/types";

export const getSellerReviews = async ({
  JWT,
  page,
  sort,
}: {
  JWT: string;
  page: number;
  sort: SortCreatedAt;
}) => {
  const limit = Number(import.meta.env.VITE_SELLER_REVIEWS_PAGE);

  const queryParamsStr = [
    limit && `limit=${limit}`,
    page && `page=${page}`,
    sort && `sort=${sort}`,
  ].join("&");

  const res = await fetch(toApiPath(`review/seller?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
