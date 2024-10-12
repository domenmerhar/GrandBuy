import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavigationTextButtonProps {
  children: React.ReactNode[];
  to: string;
  iconColoring?: "fill" | "stroke";
}

//TODO: Dark variant

interface StyledNavigationTextButtonProps {
  $iconColoring?: "fill" | "stroke";
}

const StyledNavigationTextButton = styled.a<StyledNavigationTextButtonProps>`
  display: flex;
  align-items: center;

  gap: 0.8rem;
  font-size: 2rem;
  color: var(--gray-2);

  background-color: transparent;
  border: none;
  text-decoration: none;

  transition: all 200ms;

  & > svg {
    ${({ $iconColoring }) =>
      $iconColoring === "fill"
        ? "fill: var(--gray-2);"
        : "stroke: var(--gray-2);"};
  }

  &:hover {
    color: var(--gray-0);

    & > svg {
      ${({ $iconColoring }) =>
        $iconColoring === "fill"
          ? "fill: var(--gray-0);"
          : "stroke: var(--gray-0);"};
    }
  }
`;

const Li = styled.li`
  list-style-type: none;
`;

export const NavigationTextButton: FC<NavigationTextButtonProps> = ({
  children,
  to,
  iconColoring = "stroke",
}) => {
  return (
    <Li>
      <StyledNavigationTextButton
        as={NavLink}
        to={to}
        $iconColoring={iconColoring}
      >
        {children}
      </StyledNavigationTextButton>
    </Li>
  );
};
