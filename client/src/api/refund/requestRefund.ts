import { toApiPath } from "../../functions/toApiPath";

export const requestRefund = async ({
  JWT,
  cartItemId,
  reason,
}: {
  JWT: string;
  cartItemId: string;
  reason: string;
}) => {
  const body = JSON.stringify({ reason });

  const res = await fetch(toApiPath(`refund/product/${cartItemId}`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
