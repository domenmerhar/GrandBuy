import styled from "styled-components";

interface SpinnerProps {
  $size: "small" | "medium" | "large";
}

/**
 * Komponenta za prikaz vrtečega se nalagalnika (spinner).
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {"small" | "medium" | "large"} props.$size - Velikost nalagalnika.
 * @returns {JSX.Element} JSX element, ki predstavlja vrteči se nalagalnik.
 *
 * @example
 * // Uporaba komponente
 * <Spinner $size="medium" />
 */

export const Spinner = styled.div<SpinnerProps>`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  width: ${({ $size }) => {
    if ($size === "small") return "3.2rem";
    if ($size === "medium") return "6.4rem";
    if ($size === "large") return "12.8rem";
  }};

  height: ${({ $size }) => {
    if ($size === "small") return "3.2rem";
    if ($size === "medium") return "6.4rem";
    if ($size === "large") return "12.8rem";
  }};

  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--orange-6);

  animation: spin 1s linear infinite;
`;
