import { toApiPath } from "../../functions/toApiPath";

export const payOrder = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/user/${orderId}/payOrder`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};
