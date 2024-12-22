import {
  HiOutlineBell,
  HiOutlineEye,
  HiOutlineKey,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Column } from "../../Util/Column";
import { NavigationTextButton } from "../../Util/NavigationTextButton";
import {
  HiOutlineExclamationTriangle,
  HiOutlineMegaphone,
  HiOutlineNoSymbol,
} from "react-icons/hi2";

export const DashboardAdminList = () => {
  return (
    <Column $gap="1.2rem">
      <NavigationTextButton to="overview" variant="dark">
        <HiOutlineEye size={24} />
        Overview
      </NavigationTextButton>

      <NavigationTextButton to="ban" variant="dark">
        <HiOutlineNoSymbol size={24} />
        Bans
      </NavigationTextButton>

      <NavigationTextButton to="admin" variant="dark">
        <HiOutlineUserGroup size={24} />
        Admins
      </NavigationTextButton>

      <NavigationTextButton to="warning" variant="dark">
        <HiOutlineExclamationTriangle size={24} />
        Warning
      </NavigationTextButton>

      <NavigationTextButton to="notification" variant="dark">
        <HiOutlineBell size={24} />
        Notifications
      </NavigationTextButton>

      <NavigationTextButton to="request" variant="dark">
        <HiOutlineKey size={24} />
        Requests
      </NavigationTextButton>

      <NavigationTextButton to="coupons" variant="dark" iconColoring="stroke">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          height={24}
          width={24}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
          />
        </svg>
        Coupons
      </NavigationTextButton>

      <NavigationTextButton to="report" variant="dark">
        <HiOutlineMegaphone size={24} />
        Reports
      </NavigationTextButton>
    </Column>
  );
};
