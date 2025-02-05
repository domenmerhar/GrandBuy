import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ButtonWithNotifcations } from "../ButtonWithNotifcations";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCartItemsCount } from "../../hooks/cart/useCartItemsCount";

const NavlinkHolder = styled(NavLink)`
  text-decoration: none;
`;

export const NavigationCartButton = () => {
  const { data: dataItemsCount, isLoading: isLoadingCartItems } =
    useCartItemsCount();

  return (
    <NavlinkHolder to="/cart">
      <ButtonWithNotifcations
        notificationCount={
          isLoadingCartItems ? null : dataItemsCount?.data?.cartItems
        }
      >
        <HiOutlineShoppingCart size={44} />
      </ButtonWithNotifcations>
    </NavlinkHolder>
  );
};
