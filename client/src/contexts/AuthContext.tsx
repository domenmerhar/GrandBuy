import { createContext, FC, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthInfo {
  userId: string;
  username: string;
  JWT: string;
  role: "admin" | "user" | "seller" | "";
}

const AuthContext = createContext<
  [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>, () => void] | null
>(null);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { authStorage, setAuthStorage } = useAuth();
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    userId: "",
    username: "",
    JWT: "",
    role: "",
  });

  const clearAuthInfo = () => {
    setAuthInfo({ JWT: "", userId: "", username: "", role: "" });
    setAuthStorage("");
  };

  console.log({ authInfo });

  // Initialize authInfo
  useEffect(() => {
    if (!authStorage) return;

    //TODO fetch user info from server
    setAuthInfo({ JWT: authStorage, role: "user", userId: "", username: "" });
  }, [setAuthInfo, authStorage]);

  // Update authStorage when authInfo.JWT changes
  useEffect(() => {
    setAuthStorage(authInfo.JWT);
  }, [authStorage, setAuthStorage, authInfo.JWT]);

  return (
    <AuthContext.Provider value={[authInfo, setAuthInfo, clearAuthInfo]}>
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
