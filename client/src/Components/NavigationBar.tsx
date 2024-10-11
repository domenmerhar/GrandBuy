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

const NavigationHolder = styled.div`
  background-image: linear-gradient(120deg, var(--orange-6), var(--orange-9));
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 0.5rem 0.75rem;

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
  );
};
