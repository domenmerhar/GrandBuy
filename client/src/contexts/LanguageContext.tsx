import React, { createContext, FC } from "react";
import { languages } from "../Util/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import i18n from "../Util/localization/i18n";

interface LanguageContextType {
  currentLanguage: languages;
  setCurrentLanguage: (language: "en" | "sl") => void;
}

interface LanguageProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useLocalStorage(
    "sl",
    "language"
  );

  const setCurrentLanguage = (language: "en" | "sl") => {
    i18n.changeLanguage(language);
    setCurrentLanguageState(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook za dostop do jezikovnega konteksta.
 *
 * @returns {LanguageContextType} Jezikovni kontekst.
 * @throws {Error} Če hook ni uporabljen znotraj ponudnika jezika.
 *
 * @example
 * // Uporaba hooka
 * const { currentLanguage, setCurrentLanguage } = useLanguage();
 */

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
