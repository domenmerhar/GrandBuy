import { toApiPath } from "../functions/toApiPath";

export const getProduct = async (id: string, JWT?: string) => {
  const Authorization = JWT ? `Bearer ${JWT}` : "";

  const response = await fetch(toApiPath(`product/${id}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  });
  const data = await response.json();
  return data;
};
