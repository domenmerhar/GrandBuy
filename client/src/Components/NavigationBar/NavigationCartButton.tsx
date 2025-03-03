import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ButtonWithNotifcations } from "../Button/ButtonWithNotifcations";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCartItemsCount } from "../../hooks/cart/useCartItemsCount";

const NavlinkHolder = styled(NavLink)`
  text-decoration: none;
`;

/**
 * NavigationCartButton komponenta za prikaz gumba za košarico v navigaciji.
 *
 * @function
 * @returns {JSX.Element} - JSX element gumba za košarico.
 *
 * @example
 * // Uporaba komponente
 * <NavigationCartButton />
 */

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
