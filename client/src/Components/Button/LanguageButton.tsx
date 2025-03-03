import { useLanguage } from "../../contexts/LanguageContext";
import { SwitchButtons } from "./SwitchButtons";
import { languages } from "../../Util/types";

/**
 * LanguageButton komponenta za izbiro jezika aplikacije.
 *
 * @function
 * @returns {JSX.Element} - JSX element gumba za izbiro jezika.
 *
 * @example
 * // Uporaba komponente
 * <LanguageButton />
 */

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
