import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavigationTextButtonProps {
  children: React.ReactNode[];
  to: string;
}

//TODO: Dark variant

const StyledNavigationTextButton = styled.a`
  display: flex;
  align-items: center;

  gap: 0.8rem;
  font-size: 2rem;
  color: var(--gray-2);
  stroke: var(--gray-2);

  background-color: transparent;
  border: none;
  text-decoration: none;

  transition: all 200ms;

  & > svg {
    stroke: var(--gray-2);
  }

  &:hover {
    color: var(--gray-0);

    & > svg {
      stroke: var(--gray-0);
    }
  }
`;

export const NavigationTextButton: FC<NavigationTextButtonProps> = ({
  children,
  to,
}) => {
  return (
    <StyledNavigationTextButton as={NavLink} to={to}>
      {children}
    </StyledNavigationTextButton>
  );
};
