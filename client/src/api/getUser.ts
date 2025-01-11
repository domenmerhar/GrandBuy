import { toApiPath } from "../functions/toApiPath";

export const getUser = async (id: string, role: "user" | "seller") => {
  const response = await fetch(toApiPath(`id/user/${id}?role=${role}`));
  const data = await response.json();

  return data;
};
