import { FC } from "react";
import { ButtonWithNotifcations } from "../ButtonWithNotifcations";
import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlineShoppingCart,
  HiOutlineX,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useNotficationCount } from "../../hooks/notification/useNotficationCount";

interface NotificatioCartButtonsProps {
  isOpen: boolean;
  menuHandler: () => void;
}

export const NotficationCartButtons: FC<NotificatioCartButtonsProps> = ({
  isOpen,
  menuHandler,
}) => {
  const { data } = useNotficationCount();
  return (
    <>
      <NavLink to="/notifications">
        <ButtonWithNotifcations notificationCount={data?.data?.count ?? 0}>
          <HiOutlineBell size={44} />
        </ButtonWithNotifcations>
      </NavLink>

      <NavLink to="/cart">
        <ButtonWithNotifcations notificationCount={50}>
          <HiOutlineShoppingCart size={44} />
        </ButtonWithNotifcations>
      </NavLink>

      <ButtonWithNotifcations onClick={menuHandler}>
        {isOpen ? <HiOutlineX size={44} /> : <HiOutlineMenu size={44} />}
      </ButtonWithNotifcations>
    </>
  );
};
