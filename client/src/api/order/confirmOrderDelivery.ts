import { toApiPath } from "../../functions/toApiPath";

export const confirmOrderDelivery = async ({
  JWT,
  orderId,
}: {
  JWT: string;
  orderId: string;
}) => {
  const res = await fetch(toApiPath(`order/user/${orderId}/confirmDelivery`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
