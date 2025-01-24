import { toApiPath } from "../../functions/toApiPath";

export const incrementCartItem = async ({
  JWT,
  cartItemId,
}: {
  JWT: string;
  cartItemId: string;
}) => {
  const res = await fetch(toApiPath(`cart/increment/${cartItemId}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
