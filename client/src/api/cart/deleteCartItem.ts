import { toApiPath } from "../../functions/toApiPath";

export const deleteCartItem = async ({
  JWT,
  cartItemId,
}: {
  JWT: string;
  cartItemId: string;
}) => {
  const res = await fetch(toApiPath(`cart/${cartItemId}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
