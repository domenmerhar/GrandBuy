import styled from "styled-components";
import { Logo } from "../../Util/Logo";
import { ButtonWithNotifcations } from "../ButtonWithNotifcations";
import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineShoppingCart,
  HiOutlineX,
} from "react-icons/hi";
import { useState } from "react";
import { SearchBar } from "../../Util/SearchBar";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { createPortal } from "react-dom";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const Placeholder = styled.div`
  height: 7.5rem;
`;

const BackgroundDiv = styled.div`
  background-image: linear-gradient(120deg, var(--orange-6), var(--orange-9));
  width: 100vw;
  position: fixed;
  z-index: 1000;
  height: 7.5rem;
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

const NavLinkHolder = styled(NavLink)`
  text-decoration: none;
`;

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ role }] = useAuthContext();

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <BackgroundDiv>
        <NavigationHolder>
          <NavLinkHolder to="/">
            <Logo $color="white" />
          </NavLinkHolder>

          <SearchBar />

          <ButtonHolder>
            {["admin", "user", "seller"].includes(role) ? (
              <>
                <NavLinkHolder to="/notifications">
                  <ButtonWithNotifcations notificationCount={50}>
                    <HiOutlineBell size={44} />
                  </ButtonWithNotifcations>
                </NavLinkHolder>

                <NavLinkHolder to="/cart">
                  <ButtonWithNotifcations notificationCount={50}>
                    <HiOutlineShoppingCart size={44} />
                  </ButtonWithNotifcations>
                </NavLinkHolder>

                <ButtonWithNotifcations onClick={menuHandler}>
                  {isOpen ? (
                    <HiOutlineX size={44} />
                  ) : (
                    <HiOutlineMenu size={44} />
                  )}
                </ButtonWithNotifcations>
              </>
            ) : (
              <NavLinkHolder to="/login">
                <ButtonWithNotifcations>
                  <HiArrowRightStartOnRectangle size={44} />
                </ButtonWithNotifcations>
              </NavLinkHolder>
            )}
          </ButtonHolder>
        </NavigationHolder>

        {createPortal(
          <BurgerMenu isOpen={isOpen} handleClose={menuHandler} />,
          document.getElementById("burger-menu") as HTMLElement
        )}
      </BackgroundDiv>
      <Placeholder />
      <Outlet />
    </>
  );
};
