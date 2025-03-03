import { useLocalStorage } from "./useLocalStorage";

/**
 * useAuth hook za upravljanje avtentikacijskih podatkov v lokalnem pomnilniku.
 *
 * @returns {object} - Objekt, ki vsebuje `authStorage`, `setAuthStorage` in `clearAuthStorage` funkcije.
 *
 * @example
 * // Uporaba hook-a
 * const { authStorage, setAuthStorage, clearAuthStorage } = useAuth();
 * if (authStorage) {
 * // Uporabnik je prijavljen
 * } else {
 * // Uporabnik ni prijavljen
 * }
 * setAuthStorage("your_jwt_token"); // Nastavi JWT
 * clearAuthStorage(); // Počisti JWT
 */

export const useAuth = (): {
  authStorage: string;
  setAuthStorage: (JWT: string) => void;
  clearAuthStorage: () => void;
} => {
  const [authStorage, setAuthStorage] = useLocalStorage("", "auth");

  const clearAuthStorage = () => authStorage("");

  return { authStorage, setAuthStorage, clearAuthStorage };
};
