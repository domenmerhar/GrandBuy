import { toApiPath } from "../../functions/toApiPath";
import { SortCreatedAt, SortDiscount } from "../../Util/types";

export const getCouponsSeller = async ({
  sort,
  page,
  JWT,
}: {
  sort: SortCreatedAt | SortDiscount;
  page: number;
  JWT: string;
}) => {
  const limit = Number(import.meta.env.VITE_COUPONS_PER_PAGE);

  const response = await fetch(
    toApiPath(`coupon/seller?page=${page}&limit=${limit}&sort=${sort}`),
    {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await response.json();
  const nextItem = data.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
