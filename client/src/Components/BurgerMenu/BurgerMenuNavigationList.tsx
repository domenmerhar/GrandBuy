import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlinePresentationChartBar,
  HiOutlineUser,
} from "react-icons/hi";
import { NavigationTextButton } from "../Button/NavigationTextButton";
import { HiArrowUturnLeft, HiOutlineCog8Tooth } from "react-icons/hi2";
import { BiPackage } from "react-icons/bi";
import { Column } from "../../Util/Column";
import { useMe } from "../../hooks/useMe";
import { useTranslation } from "react-i18next";

/**
 * BurgerMenuNavigationList komponenta za prikaz navigacijskega seznama v stranskem meniju.
 *
 * @component
 * @returns {JSX.Element} - JSX element navigacijskega seznama.
 *
 * @example
 * // Uporaba komponente
 * <BurgerMenuNavigationList />
 */

export const BurgerMenuNavigationList = () => {
  const { t } = useTranslation();

  const { data } = useMe();

  const userId = data?.data?._id;
  const role = data?.data?.role;

  const navigateTo = `/account/${role === "user" ? "user" : "seller"}/${userId}`;

  return (
    <Column $gap="1.2rem">
      {role !== "admin" ? (
        <NavigationTextButton to={navigateTo}>
          <HiOutlineUser size={24} />
          {t("account")}
        </NavigationTextButton>
      ) : null}

      {role === "user" ? (
        <NavigationTextButton to="wishlist">
          <HiOutlineClipboardList size={24} />
          {t("wishlist")}
        </NavigationTextButton>
      ) : null}

      {role === "user" ? (
        <NavigationTextButton to="orders" iconColoring="fill">
          <BiPackage size={24} />
          {t("orders")}
        </NavigationTextButton>
      ) : null}

      <NavigationTextButton to="history">
        <HiOutlineClock size={24} />
        {t("history")}
      </NavigationTextButton>

      <NavigationTextButton to="settings">
        <HiOutlineCog8Tooth size={24} />
        {t("settings")}
      </NavigationTextButton>

      {/* {["admin", "seller"].includes(role) && (
        <NavigationTextButton to="dashboard">
          <HiOutlinePresentationChartBar size={24} />
          {t("dashboard")}
        </NavigationTextButton>
      )} */}

      {["seller"].includes(role) && (
        <NavigationTextButton to="dashboard">
          <HiOutlinePresentationChartBar size={24} />
          {t("dashboard")}
        </NavigationTextButton>
      )}

      {role === "user" ? (
        <NavigationTextButton
          to="refund?filter=all&sort=oldest"
          iconColoring="stroke"
        >
          <HiArrowUturnLeft size={24} />
          {t("refund")}
        </NavigationTextButton>
      ) : null}
    </Column>
  );
};
