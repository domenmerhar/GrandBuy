import { useLanguage } from "../Util/LanguageContext";
import { SwitchButtons } from "../Util/SwitchButtons";
import { languages } from "../Util/types";

export const LanguageButton = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const handleClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string
  ) => {
    if (!value) return;

    setCurrentLanguage(value as languages);
  };
  return (
    <SwitchButtons
      options={[
        { name: "EN", value: "en", disabled: currentLanguage === "en" },
        { name: "SL", value: "sl", disabled: currentLanguage === "sl" },
      ]}
      onClick={handleClick}
    />
  );
};
