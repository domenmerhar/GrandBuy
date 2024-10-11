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

const NavigationHolder = styled.div`
  background-image: linear-gradient(120deg, var(--orange-6), var(--orange-5));
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 0.75rem;
`;

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <NavigationHolder>
      <Logo />

      <ButtonWithNotifcations notificationCount={50}>
        <HiOutlineBell size={48} />
      </ButtonWithNotifcations>

      <ButtonWithNotifcations notificationCount={50}>
        <HiOutlineShoppingCart size={48} />
      </ButtonWithNotifcations>

      <ButtonWithNotifcations onClick={menuHandler}>
        {isOpen ? <HiOutlineX size={48} /> : <HiOutlineMenu size={48} />}
      </ButtonWithNotifcations>
    </NavigationHolder>
  );
};
