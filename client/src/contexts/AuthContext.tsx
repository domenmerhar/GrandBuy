import { useQueryClient } from "@tanstack/react-query";
import { createContext, FC, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  JWT: string;
  setJWT: React.Dispatch<React.SetStateAction<string>>;
  clearAuthInfo: () => void;
} | null>(null);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

/**
 * AuthProvider komponenta za zagotavljanje konteksta avtentikacije.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode | React.ReactNode[]} props.children - Vsebina, ki jo ovija AuthProvider.
 * @returns {JSX.Element} - JSX element AuthProvider.
 *
 * @example
 * // Uporaba komponente
 * <AuthProvider>
 * <App />
 * </AuthProvider>
 */

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const client = useQueryClient();
  const [JWT, setJWT] = useState<string>(
    () => localStorage.getItem("JWT") || ""
  );

  useEffect(() => {
    if (!JWT) return;
    localStorage.setItem("JWT", JWT);
  }, [JWT]);

  const clearAuthInfo = () => {
    setJWT("");
    client.invalidateQueries({ queryKey: ["user-settings", JWT] });
    localStorage.removeItem("JWT");
  };

  return (
    <AuthContext.Provider value={{ JWT, setJWT, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuthContext hook za dostop do konteksta avtentikacije.
 *
 * @returns {object} - Kontekst avtentikacije.
 * @throws {Error} - Če se hook uporablja izven komponente AuthProvider.
 *
 * @example
 * // Uporaba hook-a
 * const { JWT, setJWT, clearAuthInfo } = useAuthContext();
 */

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return context;
};
