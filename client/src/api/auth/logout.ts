import { toApiPath } from "../../functions/toApiPath";

export const logout = async (JWT: string) => {
  const response = await fetch(toApiPath("user/logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
  });

  const data = await response.json();
  return data;
};
