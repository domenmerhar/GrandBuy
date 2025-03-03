import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavigationTextButtonProps {
  children: React.ReactNode[];
  to: string;
  variant?: "light" | "dark";
  iconColoring?: "fill" | "stroke";
}

interface StyledNavigationTextButtonProps {
  $iconColoring?: "fill" | "stroke";
  $variant: "light" | "dark";
}

const StyledNavigationTextButton = styled.a<StyledNavigationTextButtonProps>`
  display: flex;
  align-items: center;

  gap: 0.8rem;
  font-size: 2rem;

  color: ${({ $variant }) =>
    $variant === "light" ? "var(--gray-2)" : "var(--gray-8)"};

  background-color: transparent;
  border: none;
  text-decoration: none;

  transition: all 200ms;

  & > svg {
    ${({ $iconColoring }) =>
      $iconColoring === "fill" ? "fill: " : "stroke: "};

    ${({ $variant }) =>
      $variant === "light" ? "var(--gray-2);" : "var(--gray-8);"};
  }

  &:hover {
    color: ${({ $variant }) =>
      $variant === "light" ? "var(--gray-0)" : "var(--gray-9)"};

    & > svg {
      ${({ $iconColoring }) =>
        $iconColoring === "fill" ? "fill: " : "stroke: "};

      color: ${({ $variant }) =>
        $variant === "light" ? "var(--gray-0)" : "var(--gray-9)"};
    }
  }
`;

const Li = styled.li`
  list-style-type: none;
`;

/**
 * NavigationTextButton komponenta za prikaz navigacijskega gumba z besedilom.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {React.ReactNode[]} props.children - Vsebina gumba (besedilo in ikone).
 * @param {string} props.to - Ciljni URL, na katerega vodi gumb.
 * @param {"light" | "dark"} [props.variant="light"] - Varianta gumba (svetla ali temna).
 * @param {"fill" | "stroke"} [props.iconColoring="stroke"] - Način barvanja ikone (polnilo ali obris).
 * @returns {JSX.Element} - JSX element navigacijskega gumba z besedilom.
 *
 * @example
 * // Uporaba komponente
 * <NavigationTextButton to="/profile" variant="dark" iconColoring="fill">
 * <span>Profil</span>
 * <svg>...</svg>
 * </NavigationTextButton>
 */

export const NavigationTextButton: FC<NavigationTextButtonProps> = ({
  children,
  to,
  variant = "light",
  iconColoring = "stroke",
}) => {
  return (
    <Li>
      <StyledNavigationTextButton
        as={NavLink}
        to={to}
        $iconColoring={iconColoring}
        $variant={variant}
      >
        {children}
      </StyledNavigationTextButton>
    </Li>
  );
};
