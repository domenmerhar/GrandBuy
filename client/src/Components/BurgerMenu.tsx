import { FC } from "react";
import styled from "styled-components";
import { Backdrop } from "../Util/Backdrop";

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
  handleClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={handleClose}></Backdrop>
      <StyledBurgerMenu>
        <UserHolder></UserHolder>
      </StyledBurgerMenu>
    </>
  );
};
