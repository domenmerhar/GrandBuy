import React, { createContext, FC, useState } from "react";
import { languages } from "./types";

interface LanguageContextType {
  currentLanguage: languages;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<languages>>;
}

interface LanguageProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<languages>("sl");

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
