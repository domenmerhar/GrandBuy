import { createContext, FC, useContext, useState } from "react";

interface AuthInfo {
  userId: string;
  username: string;
  JWT: string;
  role: "admin" | "user" | "seller" | "";
}

const AuthContext = createContext<
  [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>] | null
>(null);

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    userId: "",
    username: "",
    JWT: "",
    role: "",
  });

  return (
    <AuthContext.Provider value={[authInfo, setAuthInfo]}>
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
