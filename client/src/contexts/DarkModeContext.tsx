import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | null>(null);

export const DarkModeProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [darkMode, setDarkMode] = useLocalStorage(false, "darkMode");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
};
