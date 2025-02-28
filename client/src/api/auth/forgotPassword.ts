import { toApiPath } from "../../functions/toApiPath";

export default async function forgotPassword({ email }: { email: string }) {
  const body = JSON.stringify({ email });

  const response = await fetch(toApiPath(`user/forgot-password`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
