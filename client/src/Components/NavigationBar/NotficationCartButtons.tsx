import { FC } from "react";
import { ButtonWithNotifcations } from "../Button/ButtonWithNotifcations";
import { HiOutlineBell, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useNotficationCount } from "../../hooks/notification/useNotficationCount";
import styled from "styled-components";
import { NavigationCartButton } from "./NavigationCartButton";
import { useMe } from "../../hooks/useMe";

interface NotificatioCartButtonsProps {
  isOpen: boolean;
  menuHandler: () => void;
}

const NavlinkHolder = styled(NavLink)`
  text-decoration: none;
`;

export const NotficationCartButtons: FC<NotificatioCartButtonsProps> = ({
  isOpen,
  menuHandler,
}) => {
  const { data } = useMe();
  const { data: dataNotifications, isLoading } = useNotficationCount();

  const role = data?.data?.role;

  return (
    <>
      <NavlinkHolder to="/notifications?filter=all&sort=newest">
        <ButtonWithNotifcations
          notificationCount={isLoading ? null : dataNotifications?.data?.count}
        >
          <HiOutlineBell size={44} />
        </ButtonWithNotifcations>
      </NavlinkHolder>

      {role === "user" ? <NavigationCartButton /> : null}

      <ButtonWithNotifcations onClick={menuHandler}>
        {isOpen ? <HiOutlineX size={44} /> : <HiOutlineMenu size={44} />}
      </ButtonWithNotifcations>
    </>
  );
};
