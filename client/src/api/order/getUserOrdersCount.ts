import { toApiPath } from "../../functions/toApiPath";

export const getUserOrdersCount = async ({ JWT }: { JWT: string }) => {
  const res = await fetch(toApiPath(`order/user/count`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
