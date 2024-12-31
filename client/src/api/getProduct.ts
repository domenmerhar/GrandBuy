import { toApiPath } from "../functions/toApiPath";

export const getProduct = async (id: string) => {
  const response = await fetch(toApiPath(`product/${id}`));
  const data = await response.json();
  return data;
};
