import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { SwitchButtons } from "../../Util/SwitchButtons";
import { AccountForm } from "./AccountForm";

export const LanguageSection = () => {
  return (
    <AccountForm as="div">
      <HeaderUppercaseBold as="h2">Language</HeaderUppercaseBold>

      <SwitchButtons
        options={[
          { name: "EN", value: "en" },
          { name: "SL", value: "sl" },
        ]}
      />
    </AccountForm>
  );
};
