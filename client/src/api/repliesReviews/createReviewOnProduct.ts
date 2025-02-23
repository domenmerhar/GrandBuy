import { toApiPath } from "../../functions/toApiPath";

export default async ({
  JWT,
  productId,
  rating,
  review,
}: {
  JWT: string;
  productId: string;
  rating: number;
  review: string;
}) => {
  const body = JSON.stringify({ rating, review });

  const res = await fetch(toApiPath(`review/product/${productId}`), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  return data;
};
