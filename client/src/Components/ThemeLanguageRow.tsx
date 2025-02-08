import styled from "styled-components";
import { Row } from "../Util/Row";
import { LanguageButton } from "./Button/LanguageButton";
import { ThemeButton } from "./Button/ThemeButton";

const StyledThemeLanguageRow = styled(Row)`
  position: fixed;
  z-index: 3;
  left: 5%;
  bottom: 5%;

  & * {
    stroke: var(--gray-6);
  }
`;

export const ThemeLanguageRow = () => {
  return (
    <StyledThemeLanguageRow $gap="1.6rem" $alignItems="center">
      <ThemeButton />

      <LanguageButton />
    </StyledThemeLanguageRow>
  );
};
