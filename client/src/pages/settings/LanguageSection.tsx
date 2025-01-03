import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { useLanguage } from "../../Util/LanguageContext";
import { SwitchButtons } from "../../Util/SwitchButtons";
import { languages } from "../../Util/types";
import { SettingsForm } from "./SettingsForm";

export const LanguageSection = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const handleClick = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value?: string
  ) => {
    if (!value) return;

    setCurrentLanguage(value as languages);
  };
  return (
    <SettingsForm as="div">
      <HeaderUppercaseBold as="h2">Language</HeaderUppercaseBold>

      <SwitchButtons
        options={[
          { name: "EN", value: "en", disabled: currentLanguage === "en" },
          { name: "SL", value: "sl", disabled: currentLanguage === "sl" },
        ]}
        onClick={handleClick}
      />
    </SettingsForm>
  );
};
