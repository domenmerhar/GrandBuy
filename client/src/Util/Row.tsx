import styled from "styled-components";
import { RowColumnProps } from "./types";

/**
 * Komponenta za prikaz vrstice.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} [props.$gap] - Razmik med elementi v vrstici.
 * @param {string} [props.$justifyContent] - Poravnava vsebine v vrstici.
 * @param {string} [props.$alignItems] - Poravnava elementov v vrstici.
 * @param {string} [props.$flexWrap] - Ovijanje elementov v vrstici.
 * @returns {JSX.Element} JSX element, ki predstavlja vrstico.
 *
 * @example
 * // Uporaba komponente
 * <Row $gap="1rem" $justifyContent="center" $alignItems="flex-start" $flexWrap="wrap">
 *   <YourComponent />
 * </Row>
 */

export const Row = styled.div<RowColumnProps>`
  display: flex;

  ${({ $gap }) => $gap && `gap: ${$gap};`}

  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent};`}

  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}

  ${({ $flexWrap }) => $flexWrap && `flex-wrap: ${$flexWrap};`}
`;
