import styled from "styled-components";
import { LanguageButton } from "../../Components/LanguageButton";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { SettingsForm } from "./SettingsForm";

const StyledLanguageSection = styled(SettingsForm)`
  align-items: flex-start;
`;

export const LanguageSection = () => {
  return (
    <StyledLanguageSection as="div">
      <HeaderUppercaseBold as="h2">Language</HeaderUppercaseBold>

      <LanguageButton />
    </StyledLanguageSection>
  );
};
