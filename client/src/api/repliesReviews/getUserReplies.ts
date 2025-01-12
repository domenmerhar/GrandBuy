import { toApiPath } from "../../functions/toApiPath";

export const getUserReplies = async ({
  userId,
  page,
  sort,
}: {
  userId: string;
  page: number;
  sort: "-createdAt" | "+createdAt";
}) => {
  const limit = Number(import.meta.env.VITE_USER_REVIEWS_PAGE_SIZE);

  const response = await fetch(
    toApiPath(`reply/user/${userId}?page=${page}&limit=${limit}&sort=${sort}`)
  );

  console.log(
    toApiPath(`reply/user/${userId}?page=${page}&limit=${limit}&sort=${sort}`)
  );

  const data = await response.json();

  const nextItem = data.data.replies.length === limit ? page + 1 : null;

  return { ...data, nextItem };
};
