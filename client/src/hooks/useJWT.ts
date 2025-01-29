import { useState } from "react";

export const useJWT = () => {
  const [JWT, setJWT] = useState<string>(
    () => localStorage.getItem("JWT") || ""
  );

  return { JWT, setJWT };
};
