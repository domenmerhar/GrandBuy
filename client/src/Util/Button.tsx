import styled from "styled-components";
import { ButtonColor } from "./types";

interface ButtonProps {
  $shape: "rectangle" | "oval";
  $color: ButtonColor;
  $size: "large" | "medium" | "small";
}

/**
 * Komponenta za prikaz gumba.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {"rectangle" | "oval"} props.$shape - Oblika gumba (pravokotna ali ovalna).
 * @param {"orange" | "red" | "green"} props.$color - Barva gumba.
 * @param {"large" | "medium" | "small"} props.$size - Velikost gumba.
 * @returns {JSX.Element} JSX element, ki predstavlja gumb.
 *
 * @example
 * // Uporaba komponente
 * <Button $shape="rectangle" $color="orange" $size="large">Gumb</Button>
 */
export const Button = styled.button<ButtonProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  ${({ $color }) => $color === "red" && "background-color: var(--red);"}
  ${({ $color }) => $color === "green" && "background-color: var(--green-6);"}

  color: ${({ $color }) =>
    $color === "orange"
      ? `var(--gray-light-0); body.dark-mode & {
    color: var(--gray-8); }`
      : $color === "red" || $color === "green"
        ? "var(--gray-light-2);"
        : "var(--gray-light-7);"};

  border: none;
  border-radius: ${({ $shape }) =>
    $shape === "rectangle" ? "1rem" : "1000rem"};

  padding: ${({ $size, $shape }) => {
    if ($size === "large")
      return $shape === "rectangle" ? "1rem 1.5rem" : "1.2rem 1.7rem";

    return $shape === "rectangle" ? "0.5rem 0.75rem" : "0.5rem 0.75rem";
  }};

  font-size: ${({ $size }) => {
    if ($size === "large") return "1.8rem";
    if ($size === "medium") return "1.6rem";
    return "1.4rem";
  }};
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;

  transition: all 200ms;

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

  &:hover {
    ${({ $color }) =>
      $color === "orange" &&
      "background-image: linear-gradient(120deg, var(--orange-7), var(--orange-6));"}

    ${({ $color }) => $color === "gray" && "background-color: var(--gray-4);"}

    transform: scale(1.05) translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;
