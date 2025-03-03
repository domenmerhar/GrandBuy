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

/**
 * NotficationCartButtons komponenta za prikaz gumbov za obvestila, košarico in meni.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {boolean} props.isOpen - Ali je meni odprt.
 * @param {function} props.menuHandler - Funkcija za obravnavo klika na gumb menija.
 * @returns {JSX.Element} - JSX element gumbov za obvestila, košarico in meni.
 *
 * @example
 * // Uporaba komponente
 * <NotficationCartButtons isOpen={true} menuHandler={() => console.log('Menu clicked')} />
 */

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
