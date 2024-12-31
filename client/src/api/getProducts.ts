import { toApiPath } from "../functions/toApiPath";

export const getProducts = async (query: string, page: number) => {
  const response = await fetch(
    toApiPath(`product?search=${query}&page=${page}`)
  );

  const data = await response.json();
  return data;
};
