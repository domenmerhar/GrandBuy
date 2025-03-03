import styled from "styled-components";

/**
 * Komponenta za prikaz prazne kartice.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja prazno kartico.
 *
 * @example
 * // Uporaba komponente
 * <BlankCard />
 */

export const BlankCard = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  padding: 1.6rem 2.4rem;
`;
