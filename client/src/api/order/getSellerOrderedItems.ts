import { toApiPath } from "../../functions/toApiPath";
import { SortCreatedAt } from "../../Util/types";

export const getSellerOrderedItems = async ({
  JWT,
  page,
  sort,
  filter,
}: {
  JWT: string;
  page: number;
  sort: SortCreatedAt;
  filter: "all" | "pending" | "cancelled" | "delivered";
}) => {
  const limit = Number(import.meta.env.VITE_SELLER_ORDERS_PER_PAGE);

  const queryParamsStr = [
    `limit=${limit}`,
    `page=${page}`,
    `sort=${sort}`,
    `filter=${filter}`,
  ].join("&");

  const res = await fetch(toApiPath(`cart/seller?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
