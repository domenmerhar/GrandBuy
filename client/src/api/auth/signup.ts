import { toApiPath } from "../../functions/toApiPath";

interface SignupProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signup = async (credentials: SignupProps) => {
  const body = JSON.stringify(credentials);

  const response = await fetch(toApiPath("user/signup"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
};
