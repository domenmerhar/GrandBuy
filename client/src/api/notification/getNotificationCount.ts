import { toApiPath } from "../../functions/toApiPath";

export const getNotificationCount = async (JWT: string) => {
  const res = await fetch(toApiPath("notification/count"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
