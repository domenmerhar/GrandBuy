import { FC } from "react";
import styled from "styled-components";

const StyledBurgerMenu = styled.aside`
  height: 100vh;
  background-color: var(--gray-9);
  position: fixed;
  right: 0;
  top: 75px;
  width: 30rem;

  display: flex;
  flex-direction: column;
`;

const UserHolder = styled.div`
  display: flex;
  gap: 1.6rem;
`;

interface BurgerMenuProps {
  isOpen: boolean;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return <StyledBurgerMenu>BurgerMenu</StyledBurgerMenu>;
};
