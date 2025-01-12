import { toApiPath } from "../../functions/toApiPath";

export const getMe = async (JWT: string) => {
  const res = await fetch(toApiPath(`user/me`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await res.json();

  return data;
};
