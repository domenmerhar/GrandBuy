import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | null>(null);

/**
 * DarkModeProvider komponenta za zagotavljanje konteksta temnega načina.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {ReactNode | ReactNode[]} props.children - Vsebina, ki jo ovija DarkModeProvider.
 * @returns {JSX.Element} - JSX element DarkModeProvider.
 *
 * @example
 * // Uporaba komponente
 * <DarkModeProvider>
 * <App />
 * </DarkModeProvider>
 */

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

/**
 * useDarkMode hook za dostop do konteksta temnega načina.
 *
 * @returns {object} - Kontekst temnega načina.
 * @throws {Error} - Če se hook uporablja izven komponente DarkModeProvider.
 *
 * @example
 * // Uporaba hook-a
 * const { darkMode, toggleDarkMode } = useDarkMode();
 */

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
};
