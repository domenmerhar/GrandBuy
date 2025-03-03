import styled from "styled-components";
import { Logo } from "../Logo";
import { ButtonWithNotifcations } from "../Button/ButtonWithNotifcations";
import { useState } from "react";
import { SearchBar } from "../../Util/SearchBar";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { createPortal } from "react-dom";
import { NavLink, Outlet } from "react-router-dom";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { NotficationCartButtons } from "./NotficationCartButtons";
import { useMe } from "../../hooks/useMe";
import { useAuthContext } from "../../contexts/AuthContext";

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

  @media (max-width: 49em) {
    & > :first-child {
      display: none;
    }

    padding: 0.5rem 0.8rem;
    gap: 1.6rem;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  gap: 3.2rem;
  justify-content: space-between;

  @media (max-width: 49em) {
    gap: 1.6rem;
  }
`;

const NavLinkHolder = styled(NavLink)`
  text-decoration: none;
`;

export const NavigationBar = () => {
  const { clearAuthInfo } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMe();

  const role = data?.data?.role;

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    clearAuthInfo();
  };

  return (
    <>
      <BackgroundDiv>
        <NavigationHolder>
          <NavLinkHolder to="/">
            <Logo $color="white" />
          </NavLinkHolder>

          <SearchBar />

          {/* <ButtonHolder>
            {["admin", "user", "seller"].includes(role) ? (
              <NotficationCartButtons
                isOpen={isOpen}
                menuHandler={menuHandler}
              />
            ) : (
              <NavLink to="/login" onClick={handleLogout}>
                <ButtonWithNotifcations>
                  <HiArrowRightEndOnRectangle size={44} />
                </ButtonWithNotifcations>
              </NavLink>
            )} */}

          <ButtonHolder>
            {["user", "seller"].includes(role) ? (
              <NotficationCartButtons
                isOpen={isOpen}
                menuHandler={menuHandler}
              />
            ) : (
              <NavLink to="/login" onClick={handleLogout}>
                <ButtonWithNotifcations>
                  <HiArrowRightEndOnRectangle size={44} />
                </ButtonWithNotifcations>
              </NavLink>
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
