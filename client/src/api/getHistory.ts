import { toApiPath } from "../functions/toApiPath";

export const getHistory = async ({
  JWT,
  page,
}: {
  JWT: string;
  page: number;
}) => {
  const limit = Number(import.meta.env.VITE_PRODUCT_PAGE_SIZE);

  const res = await fetch(toApiPath(`history?page=${page}&limit=${limit}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();
  const nextItem = data?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
