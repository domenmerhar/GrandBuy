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
import { useCartItemsCount } from "../../hooks/cart/useCartItemsCount";
import styled from "styled-components";

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
  const { data, isLoading } = useNotficationCount();
  const { data: dataItemsCount, isLoading: isLoadingCartItems } =
    useCartItemsCount();

  return (
    <>
      <NavlinkHolder to="/notifications?filter=all&sort=newest">
        <ButtonWithNotifcations
          notificationCount={isLoading ? null : data?.data?.count}
        >
          <HiOutlineBell size={44} />
        </ButtonWithNotifcations>
      </NavlinkHolder>

      <NavlinkHolder to="/cart">
        <ButtonWithNotifcations
          notificationCount={
            isLoadingCartItems ? null : dataItemsCount?.data?.cartItems
          }
        >
          <HiOutlineShoppingCart size={44} />
        </ButtonWithNotifcations>
      </NavlinkHolder>

      <ButtonWithNotifcations onClick={menuHandler}>
        {isOpen ? <HiOutlineX size={44} /> : <HiOutlineMenu size={44} />}
      </ButtonWithNotifcations>
    </>
  );
};
