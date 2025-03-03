import { toApiPath } from "../../functions/toApiPath";

export const getUserReviews = async (
  userId: string,
  page: number,
  sort: string = "-likes"
) => {
  const limit = Number(import.meta.env.VITE_USER_REVIEWS_PAGE_SIZE);

  const response = await fetch(
    toApiPath(`review?sort=${sort}&user=${userId}&page=${page}&limit=${limit}`)
  );

  const data = await response.json();

  const nextItem = data?.data?.doc?.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
