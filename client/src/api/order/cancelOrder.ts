import { toApiPath } from "../../functions/toApiPath";

export const cancelOrder = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/seller/${orderId}/cancel`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
