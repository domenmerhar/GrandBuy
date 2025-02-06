import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlinePresentationChartBar,
  HiOutlineUser,
} from "react-icons/hi";
import { NavigationTextButton } from "../../Util/NavigationTextButton";
import { HiArrowUturnLeft, HiOutlineCog8Tooth } from "react-icons/hi2";
import { BiPackage } from "react-icons/bi";
import { Column } from "../../Util/Column";
import { useMe } from "../../hooks/useMe";

export const BurgerMenuNavigationList = () => {
  const { data } = useMe();

  const userId = data?.data?._id;
  const role = data?.data?.role;

  const navigateTo = `/account/${role === "user" ? "user" : "seller"}/${userId}`;

  return (
    <Column $gap="1.2rem">
      {role !== "admin" ? (
        <NavigationTextButton to={navigateTo}>
          <HiOutlineUser size={24} />
          Account
        </NavigationTextButton>
      ) : null}

      {role === "user" ? (
        <NavigationTextButton to="wishlist">
          <HiOutlineClipboardList size={24} />
          Wishlist
        </NavigationTextButton>
      ) : null}

      {role === "user" ? (
        <NavigationTextButton to="orders" iconColoring="fill">
          <BiPackage size={24} />
          Orders
        </NavigationTextButton>
      ) : null}

      <NavigationTextButton to="history">
        <HiOutlineClock size={24} />
        History
      </NavigationTextButton>

      <NavigationTextButton to="settings">
        <HiOutlineCog8Tooth size={24} />
        Settings
      </NavigationTextButton>

      {["admin", "seller"].includes(role) && (
        <NavigationTextButton to="dashboard">
          <HiOutlinePresentationChartBar size={24} />
          Dashboard
        </NavigationTextButton>
      )}

      {role === "user" ? (
        <NavigationTextButton
          to="refund?filter=all&sort=oldest"
          iconColoring="stroke"
        >
          <HiArrowUturnLeft size={24} />
          Refund
        </NavigationTextButton>
      ) : null}
    </Column>
  );
};
