import styled from "styled-components";

interface IconNavProps {
  $iconColoring?: "fill" | "stroke";
}

/**
 * Komponenta za prikaz navigacijskega gumba z ikono.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {"fill" | "stroke"} [props.$iconColoring] - Način barvanja ikone.
 * @returns {JSX.Element} JSX element, ki predstavlja navigacijski gumb z ikono.
 *
 * @example
 * // Uporaba komponente
 * <IconNav $iconColoring="fill">
 *   <svg>...</svg>
 * </IconNav>
 */

export const IconNav = styled.button<IconNavProps>`
  background-color: transparent;
  border: none;
  transition: all 200ms;

  & svg {
    width: 4.8rem;
    height: 4.8rem;
  }

  &:hover * {
    transform: scale(1.05);

    ${({ $iconColoring }) =>
      $iconColoring === "fill"
        ? "fill: var(--gray-0);"
        : "stroke: var(--gray-0);"};
  }

  &:active {
    transform: scale(0.95);
  }

  & * {
    ${({ $iconColoring }) =>
      $iconColoring === "fill"
        ? "fill: var(--gray-2);"
        : "stroke: var(--gray-2);"};

    transition: all 200ms;
  }
`;
