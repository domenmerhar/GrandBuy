export const getProduct = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_LINK}/product/${id}`
  );
  const data = await response.json();
  return data;
};
