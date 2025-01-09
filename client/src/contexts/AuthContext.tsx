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
  const { auth, setAuth } = useAuth();
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    userId: "",
    username: "",
    JWT: "",
    role: "",
  });

  const clearAuthInfo = () => {
    setAuthInfo({ JWT: "", userId: "", username: "", role: "" });
    setAuth("");
  };

  useEffect(() => {
    setAuth(authInfo.JWT);
  }, [
    authInfo.JWT,
    authInfo.role,
    authInfo.userId,
    authInfo.username,
    setAuth,
  ]);

  useEffect(() => {
    if (!auth.JWT) return;
    console.log("fetching user info from server");

    //TODO fetch user info from server
  }, [auth.JWT]);

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
