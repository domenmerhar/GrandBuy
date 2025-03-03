import styled from "styled-components";
import { Row } from "./Row";

interface ReviewActionProps {
  $active?: boolean;
}

/**
 * Komponenta za prikaz akcij za preglede.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {boolean} [props.$active] - Ali je akcija aktivna.
 * @returns {JSX.Element} JSX element, ki predstavlja akcijo za pregled.
 *
 * @example
 * // Uporaba komponente
 * <ReviewAction $active={true}>Pregled</ReviewAction>
 */

export const ReviewAction = styled(Row)<ReviewActionProps>`
  background: transparent;
  border: none;
  text-transform: uppercase;
  cursor: pointer;

  transition: all 200ms;

  ${({ $active }) => $active && `color: var(--orange-6);`}

  &:hover {
    color: var(--gray-9);
  }
`;
