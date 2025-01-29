import { toApiPath } from "../../functions/toApiPath";
import { RefundStatus } from "../../Util/types";

export const getUserRefunds = async ({
  JWT,
  page,
  status,
  sort,
}: {
  JWT: string;
  page: number;
  status?: RefundStatus;
  sort: "-createdAt" | "+createdAt";
}) => {
  const limit = Number(import.meta.env.VITE_REFUNDS_NOTIFICATIONS_PAGE_SIZE);

  const res = await fetch(
    toApiPath(
      `refund/my?page=${page}&limit=${limit}&sort=${sort}${status && `&status=${status}`}`
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await res.json();
  const nextItem = data?.refunds?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
