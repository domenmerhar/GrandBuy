import { toApiPath } from "../../functions/toApiPath";

export default async ({ JWT, reviewId }: { JWT: string; reviewId: string }) => {
  const res = await fetch(toApiPath(`review/${reviewId}/like`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
