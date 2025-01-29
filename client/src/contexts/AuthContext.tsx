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

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return context;
};
