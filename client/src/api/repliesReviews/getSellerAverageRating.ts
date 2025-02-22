import { toApiPath } from "../../functions/toApiPath";

export default async ({ JWT }: { JWT: string }) => {
  const res = await fetch(toApiPath(`review/seller/average-rating`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
