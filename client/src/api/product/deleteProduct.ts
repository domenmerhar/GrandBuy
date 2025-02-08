import { toApiPath } from "../../functions/toApiPath";

export const deleteProduct = async ({
  JWT,
  id,
}: {
  JWT: string;
  id: string;
}) => {
  const Authorization = `Bearer ${JWT}`;

  const response = await fetch(toApiPath(`product/${id}`), {
    method: "DELETE",
    headers: {
      Authorization,
    },
  });

  const data = await response.json();
  return data;
};
