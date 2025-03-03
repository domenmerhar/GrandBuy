import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavigationTextButtonProps {
  children: React.ReactNode[];
  to: string;
  variant?: "light" | "dark";
  iconColoring?: "fill" | "stroke";
}

//TODO: Dark variant

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
