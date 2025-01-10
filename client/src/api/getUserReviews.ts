import { toApiPath } from "../functions/toApiPath";

export const getUserReviews = async (userId: string, page: number) => {
  const limit = 2;
  const response = await fetch(
    toApiPath(
      `review?sort=-likes,-rating&user=${userId}&page=${page}&limit=${limit}`
    )
  );

  const data = await response.json();

  const nextItem = data.data.doc.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
