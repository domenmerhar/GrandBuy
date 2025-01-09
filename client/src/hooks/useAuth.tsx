import { useLocalStorage } from "./useLocalStorage";

export const useAuth = (): {
  auth: { JWT: string };
  setAuth: (JWT: string) => void;
  clearAuth: () => void;
} => {
  const [auth, setAuth] = useLocalStorage(
    {
      JWT: "",
    },
    "auth"
  );

  const clearAuth = () => setAuth({ JWT: "" });

  return { auth, setAuth, clearAuth };
};
