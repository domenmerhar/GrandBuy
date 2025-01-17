import { toApiPath } from "../../functions/toApiPath";
import { NotificationType } from "../../Util/types";

export const getYourNotifications = async ({
  JWT,
  page,
  sort,
  type,
}: {
  JWT: string;
  page: number;
  type: NotificationType & "all";
  sort: "-createdAt" | "+createdAt";
}) => {
  const limit = Number(import.meta.env.VITE_REFUNDS_NOTIFICATIONS_PAGE_SIZE);

  const res = await fetch(
    toApiPath(
      `notification/?page=${page}&limit=${limit}&sort=${sort}${["message", "warning"].includes(type) && `&type=${type}`}`
    ),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }
  );

  const data = await res.json();
  const nextItem = data?.data?.notifications.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
