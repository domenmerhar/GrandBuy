import styled from "styled-components";
import { RowColumnProps } from "./types";

/**
 * Komponenta za prikaz stolpca.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} [props.$gap] - Razmik med elementi v stolpcu.
 * @param {string} [props.$justifyContent] - Poravnava vsebine v stolpcu.
 * @param {string} [props.$alignItems] - Poravnava elementov v stolpcu.
 * @param {string} [props.$flexWrap] - Ovijanje elementov v stolpcu.
 * @returns {JSX.Element} JSX element, ki predstavlja stolpec.
 *
 * @example
 * // Uporaba komponente
 * <Column $gap="1rem" $justifyContent="center" $alignItems="flex-start" $flexWrap="wrap">
 *   <YourComponent />
 * </Column>
 */

export const Column = styled.div<RowColumnProps>`
  display: flex;
  flex-direction: column;

  ${({ $gap }) => $gap && `gap: ${$gap};`}

  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent};`}

  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}

  ${({ $flexWrap }) => $flexWrap && `flex-wrap: ${$flexWrap};`}
`;
