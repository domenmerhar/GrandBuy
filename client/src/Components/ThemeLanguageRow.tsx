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

/**
 * ThemeLanguageRow komponenta za prikaz vrstice z gumbi za izbiro teme in jezika.
 *
 * @component
 * @returns {JSX.Element} - JSX element vrstice z gumbi za temo in jezik.
 *
 * @example
 * // Uporaba komponente
 * <ThemeLanguageRow />
 */

export const ThemeLanguageRow = () => {
  return (
    <StyledThemeLanguageRow $gap="1.6rem" $alignItems="center">
      <ThemeButton />

      <LanguageButton />
    </StyledThemeLanguageRow>
  );
};
