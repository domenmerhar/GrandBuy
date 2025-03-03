import styled from "styled-components";

interface ArrowButtonProps {
  $size: "medium" | "large";
}

/**
 * Komponenta za prikaz gumba s puščico.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {"medium" | "large"} props.$size - Velikost gumba (srednja ali velika).
 * @returns {JSX.Element} JSX element, ki predstavlja gumb s puščico.
 *
 * @example
 * // Uporaba komponente
 * <ArrowButton $size="medium">
 *   <svg>...</svg>
 * </ArrowButton>
 */

export const ArrowButton = styled.button<ArrowButtonProps>`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.2);

  user-select: none;
  border: none;
  border-radius: 50%;
  background-color: var(--gray-1);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $size }) => $size === "medium" && `height: 4.8rem; width: 4.8rem;`}
  ${({ $size }) => $size === "large" && `height: 6.4rem; width: 6.4rem;`}
  margin: auto 0;

  transition: all 200ms;

  & svg {
    ${({ $size }) => $size === "medium" && `height: 4.2rem; width: 4.2rem;`}
    ${({ $size }) => $size === "large" && `height: 6.6rem; width: 5.6rem;`}
    fill: var(--gray-8);
  }
`;
