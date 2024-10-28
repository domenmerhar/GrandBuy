import styled from "styled-components";
import { Logo } from "../Util/Logo";
import { ButtonWithNotifcations } from "./ButtonWithNotifcations";
import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineShoppingCart,
  HiOutlineX,
} from "react-icons/hi";
import { useState } from "react";
import { SearchBar } from "../Util/SearchBar";
import { BurgerMenu } from "./BurgerMenu";
import { createPortal } from "react-dom";

const BackgroundDiv = styled.div`
  background-image: linear-gradient(120deg, var(--orange-6), var(--orange-9));
`;

const NavigationHolder = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1440px;
  padding: 0.5rem 3.2rem;

  & > *:nth-child(2) {
    flex: 20rem 0.5 1;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  gap: 3.2rem;
  justify-content: space-between;
`;

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BackgroundDiv>
      <NavigationHolder>
        <Logo />

        <SearchBar />

        <ButtonHolder>
          <ButtonWithNotifcations notificationCount={50}>
            <HiOutlineBell size={44} />
          </ButtonWithNotifcations>

          <ButtonWithNotifcations notificationCount={50}>
            <HiOutlineShoppingCart size={44} />
          </ButtonWithNotifcations>

          <ButtonWithNotifcations onClick={menuHandler}>
            {isOpen ? <HiOutlineX size={44} /> : <HiOutlineMenu size={44} />}
          </ButtonWithNotifcations>
        </ButtonHolder>
      </NavigationHolder>

      {createPortal(
        <BurgerMenu isOpen={isOpen} handleClose={menuHandler} />,
        document.getElementById("burger-menu") as HTMLElement
      )}
    </BackgroundDiv>
  );
};
