import styled from "styled-components";

/**
 * Komponenta za prikaz ozadja.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja ozadje.
 *
 * @example
 * // Uporaba komponente
 * <Backdrop />
 */

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 3;
`;
