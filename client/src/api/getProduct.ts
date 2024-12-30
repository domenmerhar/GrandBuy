export const getProducts = async (query: string, page: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_LINK}/product?search=${query}&page=${page}`
  );

  const data = await response.json();
  return data;
};
