import { useLocalStorage } from "./useLocalStorage";

export const useAuth = (): {
  authStorage: string;
  setAuthStorage: (JWT: string) => void;
  clearAuthStorage: () => void;
} => {
  const [authStorage, setAuthStorage] = useLocalStorage("", "auth");

  const clearAuthStorage = () => authStorage("");

  return { authStorage, setAuthStorage, clearAuthStorage };
};
