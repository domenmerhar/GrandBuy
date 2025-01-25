import { toApiPath } from "../../functions/toApiPath";

export const addOrder = async ({
  JWT,
  cartItems,
}: {
  JWT: string;
  cartItems: string[];
}) => {
  const body = JSON.stringify({ cartItems });

  const res = await fetch(toApiPath(`order/`), {
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
