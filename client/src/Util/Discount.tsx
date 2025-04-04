import styled from "styled-components";

/**
 * Komponenta za prikaz popusta.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja popust.
 *
 * @example
 * // Uporaba komponente
 * <Discount>
 *   -50%
 * </Discount>
 */

export const Discount = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -25px;
  top: -25px;

  background-color: var(--red);
  color: var(--gray-light-0);

  rotate: 30deg;
  height: 5rem;
  width: 5rem;
  border-radius: 50px;

  font-weight: 600;
  font-size: 1.6rem;
`;
