import { toApiPath } from "../../functions/toApiPath";

export const shipOrder = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/seller/${orderId}/ship`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
