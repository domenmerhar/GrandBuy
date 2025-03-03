import styled from "styled-components";

/**
 * Komponenta za prikaz naslova z velikimi črkami in krepko pisavo.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja naslov z velikimi črkami in krepko pisavo.
 *
 * @example
 * // Uporaba komponente
 * <HeaderUppercaseBold>Naslov</HeaderUppercaseBold>
 */

export const HeaderUppercaseBold = styled.h2`
  font-size: 2rem;
  color: var(--gray-7);
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
