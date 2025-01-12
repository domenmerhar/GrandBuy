import { toApiPath } from "../../functions/toApiPath";

export const requestSeller = async (JWT: string) => {
  const response = await fetch(toApiPath("request/"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();
  return data;
};
