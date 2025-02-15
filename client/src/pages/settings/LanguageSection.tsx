import styled from "styled-components";
import { LanguageButton } from "../../Components/Button/LanguageButton";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { SettingsForm } from "./SettingsForm";
import { useTranslation } from "react-i18next";

const StyledLanguageSection = styled(SettingsForm)`
  align-items: flex-start;
`;

export const LanguageSection = () => {
  const { t } = useTranslation();

  return (
    <StyledLanguageSection as="div">
      <HeaderUppercaseBold as="h2">{t("language")}</HeaderUppercaseBold>

      <LanguageButton />
    </StyledLanguageSection>
  );
};
