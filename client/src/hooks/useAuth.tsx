import { useLocalStorage } from "./useLocalStorage";

export const useAuth = (): {
  authStorage: string;
  setAuthStorage: (JWT: string) => void;
  clearAuthStorage: () => void;
} => {
  const [authStorage, setAuthStorage] = useLocalStorage(
    {
      JWT: "",
    },
    "auth"
  );

  const clearAuthStorage = () => authStorage({ JWT: "" });

  return { authStorage, setAuthStorage, clearAuthStorage };
};
