import { ReviewSort } from "../Util/types";
import { toApiPath } from "./toApiPath";

export const getReviews = async ({
  productId,
  page,
  sort = "-likesCount",
}: {
  productId: string;
  page: number;
  sort: ReviewSort;
}) => {
  const response = await fetch(
    toApiPath(
      `review/product/${productId}?page=${page}${sort ? `&sort=${sort.replace("+", "%2B")}` : ""}`
    )
  );
  const data = await response.json();

  return data;
};
