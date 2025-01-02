import { toApiPath } from "../../../functions/toApiPath";

export const getReplies = async ({
  reviewId,
  page = 1,
  limit = 5,
}: {
  reviewId: string;
  page: number;
  limit: number;
}) => {
  const res = await fetch(
    toApiPath(`reply/review/${reviewId}?page=${page}&limit=${limit}`)
  );
  const data = await res.json();
  return data;
};
