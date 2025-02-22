import { toApiPath } from "../../functions/toApiPath";

export default async ({
  JWT,
  reviewId,
  reply,
}: {
  JWT: string;
  reviewId: string;
  reply: string;
}) => {
  const body = JSON.stringify({ reply });

  const res = await fetch(toApiPath(`reply/review/${reviewId}`), {
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
