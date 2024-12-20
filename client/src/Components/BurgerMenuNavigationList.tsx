import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlinePresentationChartBar,
  HiOutlineUser,
} from "react-icons/hi";
import { NavigationTextButton } from "../Util/NavigationTextButton";
import { HiArrowUturnLeft, HiOutlineCog8Tooth } from "react-icons/hi2";
import { BiPackage } from "react-icons/bi";
import styled from "styled-components";

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const BurgerMenuNavigationList = () => {
  return (
    <NavigationList>
      <NavigationTextButton to="account">
        <HiOutlineUser size={24} />
        Account
      </NavigationTextButton>

      <NavigationTextButton to="wishlist">
        <HiOutlineClipboardList size={24} />
        Wishlist
      </NavigationTextButton>

      <NavigationTextButton to="orders" iconColoring="fill">
        <BiPackage size={24} />
        Orders
      </NavigationTextButton>

      <NavigationTextButton to="history">
        <HiOutlineClock size={24} />
        History
      </NavigationTextButton>

      <NavigationTextButton to="settings">
        <HiOutlineCog8Tooth size={24} />
        Settings
      </NavigationTextButton>

      <NavigationTextButton to="dashboard">
        <HiOutlinePresentationChartBar size={24} />
        Dashboard
      </NavigationTextButton>

      <NavigationTextButton to="refund" iconColoring="stroke">
        <HiArrowUturnLeft size={24} />
        Refund
      </NavigationTextButton>
    </NavigationList>
  );
};
