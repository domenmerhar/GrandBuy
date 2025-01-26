import { toApiPath } from "../../functions/toApiPath";

export const getUserOrders = async ({
  JWT,
  page,
}: {
  JWT: string;
  page: number;
}) => {
  const limit = Number(import.meta.env.VITE_ORDERS_PER_PAGE);

  const queryParamsStr = [
    limit && `limit=${limit}`,
    page && `page=${page}`,
  ].join("&");

  const res = await fetch(toApiPath(`order/user?${queryParamsStr}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
