import styled from "styled-components";
import { BadgeProps } from "./types";

/**
 * Komponenta za prikaz značke.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {"orange" | "red" | "green" | "yellow"} props.$color - Barva značke.
 * @param {"medium" | "small"} [props.$size="medium"] - Velikost značke.
 * @returns {JSX.Element} JSX element, ki predstavlja značko.
 *
 * @example
 * // Uporaba komponente
 * <Badge $color="orange" $size="small">Oznaka</Badge>
 */

export const Badge = styled.span<BadgeProps>`
  ${({ $color }) =>
    $color === "orange" &&
    "background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));"}

  ${({ $color }) => $color === "red" && "background-color: var(--red);"}

  ${({ $color }) => $color === "green" && "background-color: var(--green-6);"}

  ${({ $color }) => $color === "yellow" && "background-color: var(--yellow);"}

  color: var(--gray-0);

  body.dark-mode & {
    color: var(--gray-7);
  }

  text-transform: uppercase;
  font-weight: ${({ $color }) => ($color === "red" ? 600 : 500)};
  letter-spacing: 0.2px;

  ${({ $size = "medium" }) => {
    if ($size === "medium") return "padding: 0.6rem 0.9rem;";
    if ($size === "small") return "padding: 0.4rem 0.7rem;";
  }}

  ${({ $size = "medium" }) => {
    if ($size === "medium") return "font-size: 1.6rem;";
    if ($size === "small") return "font-size: 1.4rem;";
  }}

  border-radius: 2rem;
`;
